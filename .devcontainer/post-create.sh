#!/usr/bin/env bash
set -e

# Install npm workspace dependencies
npm install

# Install premake5 binary
# PREMAKE_VERSION can be:
#   - A release tag (e.g. "5.0.0-beta8")    → downloaded from GitHub Releases (no auth needed)
#   - A commit SHA (e.g. "aa960f171d36...") → downloaded from GitHub Actions artifacts
#                                              (requires GITHUB_TOKEN; auto-set in Codespaces)
PREMAKE_VERSION="${PREMAKE_VERSION:-5.0.0-beta8}"

echo "Installing premake5 ${PREMAKE_VERSION}..."

if [[ "$PREMAKE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9] ]]; then
  # ── Release tag ──────────────────────────────────────────────────────────────
  PREMAKE_URL="https://github.com/premake/premake-core/releases/download/v${PREMAKE_VERSION}/premake-${PREMAKE_VERSION}-linux.tar.gz"
  curl -fsSL "$PREMAKE_URL" | sudo tar -xz -C /usr/local/bin premake5
else
  # ── Commit SHA ───────────────────────────────────────────────────────────────
  if [ -z "${GITHUB_TOKEN:-}" ]; then
    echo "Error: GITHUB_TOKEN must be set to download premake from a commit SHA." >&2
    echo "       In Codespaces it is injected automatically." >&2
    echo "       Locally, pass it via devcontainer secrets or containerEnv." >&2
    exit 1
  fi

  AUTH_HEADER="Authorization: Bearer $GITHUB_TOKEN"
  API="https://api.github.com/repos/premake/premake-core"

  # Find the latest successful CI run for this commit
  RUN_ID=$(curl -fsSL \
    -H "$AUTH_HEADER" \
    -H "Accept: application/vnd.github+json" \
    "${API}/actions/runs?head_sha=${PREMAKE_VERSION}&status=success&per_page=10" \
    | node -e "
      process.stdin.setEncoding('utf8');
      let d = '';
      process.stdin.on('data', c => d += c).on('end', () => {
        const runs = JSON.parse(d).workflow_runs ?? [];
        const run = runs.find(r => r.name === 'CI') ?? runs[0];
        console.log(run?.id ?? '');
      });
    ")

  if [ -z "$RUN_ID" ]; then
    echo "Error: No successful CI run found for commit ${PREMAKE_VERSION}." >&2
    exit 1
  fi

  echo "  Found CI run ${RUN_ID}"

  # Find the premake-linux-x64 artifact in that run
  ARTIFACT_URL=$(curl -fsSL \
    -H "$AUTH_HEADER" \
    -H "Accept: application/vnd.github+json" \
    "${API}/actions/runs/${RUN_ID}/artifacts?per_page=50" \
    | node -e "
      process.stdin.setEncoding('utf8');
      let d = '';
      process.stdin.on('data', c => d += c).on('end', () => {
        const artifact = (JSON.parse(d).artifacts ?? []).find(a => a.name === 'premake-linux-x64');
        console.log(artifact?.archive_download_url ?? '');
      });
    ")

  if [ -z "$ARTIFACT_URL" ]; then
    echo "Error: premake-linux-x64 artifact not found in run ${RUN_ID}." >&2
    exit 1
  fi

  # Download the zip and extract the binary
  TMP_ZIP=$(mktemp /tmp/premake-linux-XXXXXX.zip)
  TMP_DIR=$(mktemp -d /tmp/premake-extract-XXXXXX)
  curl -fsSL -L \
    -H "$AUTH_HEADER" \
    -H "Accept: application/vnd.github+json" \
    "$ARTIFACT_URL" \
    -o "$TMP_ZIP"
  unzip -q "$TMP_ZIP" premake5 -d "$TMP_DIR"
  sudo mv "$TMP_DIR/premake5" /usr/local/bin/premake5
  rm -rf "$TMP_ZIP" "$TMP_DIR"
fi

sudo chmod +x /usr/local/bin/premake5
echo "premake5 installed: $(premake5 --version)"

# ── Pull premake-core documentation ──────────────────────────────────────────
echo "Pulling premake-core documentation for ${PREMAKE_VERSION}..."

WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DEST="${WORKSPACE_ROOT}/packages/premake-ts-generator/docs"

if [[ "$PREMAKE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9] ]]; then
  DOCS_REF="v${PREMAKE_VERSION}"
else
  DOCS_REF="${PREMAKE_VERSION}"
fi

ARCHIVE_URL="https://github.com/premake/premake-core/archive/${DOCS_REF}.tar.gz"
TMP_TAR=$(mktemp /tmp/premake-docs-XXXXXX.tar.gz)
TMP_EXTRACT=$(mktemp -d /tmp/premake-docs-XXXXXX)

if [ -n "${GITHUB_TOKEN:-}" ]; then
  curl -fsSL -L -H "Authorization: Bearer $GITHUB_TOKEN" "$ARCHIVE_URL" -o "$TMP_TAR"
else
  curl -fsSL -L "$ARCHIVE_URL" -o "$TMP_TAR"
fi

tar -xz -C "$TMP_EXTRACT" -f "$TMP_TAR"

DOCS_SRC=$(find "$TMP_EXTRACT" -type d -name "docs" -path "*/website/docs" | head -1)

if [ -z "$DOCS_SRC" ]; then
  echo "Error: website/docs not found in premake-core archive for ref ${DOCS_REF}." >&2
  rm -rf "$TMP_TAR" "$TMP_EXTRACT"
  exit 1
fi

rm -rf "$DOCS_DEST"
cp -r "$DOCS_SRC" "$DOCS_DEST"
rm -rf "$TMP_TAR" "$TMP_EXTRACT"

echo "Documentation pulled to ${DOCS_DEST}"
