workspace "MyWorkspace"
	configurations { "Debug", "Release" }
	project "MyProject"
		kind "ConsoleApp"
		language "C++"
		characterset "MBCS"
		cppdialect "C++23"
		targetdir "bin/"
		files { "*.c" }
		filter "configurations:Release"
			files { "src/release/**.cpp" }
		filter {}