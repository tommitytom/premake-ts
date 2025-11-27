workspace "workspace"
	project "project"
		kind "ConsoleApp"
		language "C++"
		filter { "system:windows" }
			systemversion "latest"
		filter {}
		shadertype 'Vertex'
		files { "src/**.cpp", "include/**.h" }