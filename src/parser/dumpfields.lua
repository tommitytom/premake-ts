print("Extracting field data to fields.json")
print("Premake version: " .. _PREMAKE_VERSION)

local p = premake

function removeFunctions(t)
	if t.allowed == nil then
		return
	end

	if type(t.allowed) == "function" then
		t.allowed = {}
	elseif type(t.allowed) ~= "table" then
		for k,v in pairs(t.allowed) do
			if type(v) == "function" then
				t.allowed[k] = {}
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
			for ak, av in ipairs(v.allowed) do
				table.insert(allowList, av)
			end
		end

		v.allowed = allowList

		print(k)
		if v._kind == v.kind then
			v._kind = nil
		end

		j, err = json.encode(v)
		if err then
			print(k .. ": Error encoding to JSON: " .. err)
			table.insert(items, { name = k, fieldtype = "function" })

			print(k, v)

			for k,v in pairs(v) do
				print("  ", k, type(v))
			end
		else
			table.insert(items, v)
		end
	end
end

j, err = json.encode(items)
if err then
	print("  Error encoding to JSON: " .. err)
	return
end

io.writefile('fields.json', j)

os.exit()
--print(j)
