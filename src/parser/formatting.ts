export function formatJsonString(jsonString: string): string {
	return jsonString.replace(/^```(?:json|markdown)?\n?/, "").replace(/\n?```$/, "");
}
