print("Premake version: " .. _PREMAKE_VERSION)
print("Extracting field data to fields.json")

local p = premake

local function removeFunctions(t)
	if t.allowed == nil then
		return
	end

	if type(t.allowed) == "function" then
		t.allowed = {}
	elseif type(t.allowed) == "table" then
		for k,v in pairs(t.allowed) do
			if type(v) == "function" then
				t.allowed[k] = nil
			end
		end
	end
end

local items = {}
for k,v in pairs(p.fields) do
	if type(v) == "table" and v.deprecated == nil then
		removeFunctions(v)

		local allowList = {}
		if v.allowed ~= nil then
			for _, av in ipairs(v.allowed) do
				table.insert(allowList, av)
			end
		end

		v.allowed = allowList

		--print(k)
		if v._kind == v.kind then
			v._kind = nil
		end

		local j, err = json.encode(v)
		if err then
			print(k .. ": Error encoding to JSON: " .. err)

			print(k, v)

			for k,v in pairs(v.allowed) do
				print("  ", k, type(v))
			end
		else
			table.insert(items, v)
		end
	end
end

-- Add items that are defined outside of the fields list
table.insert(items, {
	allowed = {},
	kind = "string",
	name = "workspace",
	scope = "config",
	scopes = {"config"}
})

table.insert(items, {
	allowed = {},
	kind = "string",
	name = "project",
	scope = "workspace",
	scopes = {"workspace"}
})

table.insert(items, {
	allowed = {},
	kind = "string",
	name = "group",
	scope = "workspace",
	scopes = {"workspace"}
})

table.insert(items, {
	allowed = {},
	kind = "list:string",
	name = "filter",
	scope = "config",
	scopes = {"config"},
	optional = true
})

local j, err = json.encode(items)
if err then
	print("  Error encoding to JSON: " .. err)
	return
end

io.writefile('data/fields.json', j)

os.exit()
