workspace "orb"
	configurations { "Debug,Release" }
	architecture "x86_64"
	location "build/vs2022"
	cppdialect "C++20"
	filter "configurations:Debug"
		defines { "DEBUG" }
		symbols "On"
	filter {}
	filter "configurations:Release"
		defines { "NDEBUG" }
		optimize "On"
	filter {}
	project "app"
		kind "ConsoleApp"
		files { "src/app/orb.ts" }
		includedirs { "src/audio" }
		files { "src/app/**.h", "src/app/**.cpp" }
		links { "app" }
		links { "audio" }
		links { "r8brain" }
		links { "foundation" }
		links { "reflect-cpp" }
	project "audio"
		kind "StaticLib"
		files { "src/audio/orb.ts" }
		includedirs { "thirdparty/r8brain" }
		includedirs { "src/audio" }
		files { "src/audio/**.h", "src/audio/**.cpp" }
	project "foundation"
		kind "StaticLib"
		files { "src/foundation/orb.ts" }
		includedirs { "thirdparty/entt" }
		includedirs { "thirdparty/reflect-cpp/include" }
		files { "src/foundation/**.h", "src/foundation/**.cpp" }
	project "reflect-cpp"
		kind "StaticLib"
		files { "thirdparty/reflect-cpp.ts" }
		includedirs { "thirdparty/reflect-cpp/include" }
		includedirs { "thirdparty/reflect-cpp/include/rfl/thirdparty" }
		files { "thirdparty/reflect-cpp/**.h", "thirdparty/reflect-cpp/src/reflectcpp.cpp", "thirdparty/reflect-cpp/src/reflectcpp_json.cpp", "thirdparty/reflect-cpp/src/yyjson.c" }
	project "r8brain"
		kind "StaticLib"
		files { "thirdparty/r8brain.ts" }
		includedirs { "thirdparty/r8brain" }
		files { "thirdparty/r8brain/*.h", "thirdparty/r8brain/r8bbase.cpp" }
	project "entt"
		kind "StaticLib"
		files { "thirdparty/entt.ts" }
		includedirs { "thirdparty/entt" }