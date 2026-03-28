print("Premake version: " .. _PREMAKE_VERSION)
print("Extracting field data to fields.json")

local p = premake

local function removeFunctions(t)
	if type(t) ~= "table" then
		return
	end

	for k, v in pairs(t) do
		if type(v) == "function" then
			t[k] = nil
		elseif type(v) == "table" then
			removeFunctions(v)
		end
	end
end

local items = {}
for k,v in pairs(p.fields) do
	if type(v) == "table" then
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

table.insert(items, {
	allowed = {},
	kind = "string",
	name = "usage",
	scope = "project",
	scopes = {"project"}
})

local j, err = json.encode(items)
if err then
	print("  Error encoding to JSON: " .. err)
	return
end

io.writefile('data/fields.json', j)

os.exit()
