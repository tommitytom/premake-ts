type CppDialect = 'Default'|'C++latest'|'C++98'|'C++0x'|'C++11'|'C++1y'|'C++14'|'C++1z'|'C++17'|'C++2a'|'C++20'|'C++2b'|'C++23'|'gnu++98'|'gnu++0x'|'gnu++11'|'gnu++1y'|'gnu++14'|'gnu++1z'|'gnu++17'|'gnu++2a'|'gnu++20'|'gnu++2b'|'gnu++23';

export interface ConfigScopePredefined {
	/**
	 * Set the C++ dialect
	 * @param dialect - The C++ standard to use:
	 * - `Default`: the default C++ dialect for the toolset
	 * - `C++latest`: the latest C++ dialect for the toolset or action where available, otherwise the latest C++ dialect supported by Premake
	 * - `C++98`: ISO C++98
	 * - `C++0x`: ISO C++11 Draft
	 * - `C++11`: ISO C++11
	 * - `C++1y`: ISO C++14 Draft
	 * - `C++14`: ISO C++14
	 * - `C++1z`: ISO C++17 Draft
	 * - `C++17`: ISO C++17
	 * - `C++2a`: ISO C++20 Draft
	 * - `C++20`: ISO C++20
	 * - `C++2b`: ISO C++23 Draft
	 * - `C++23`: ISO C++23
	 * - `gnu++98`: GNU dialect of ISO C++98
	 * - `gnu++0x`: GNU dialect of ISO C++11 Draft
	 * - `gnu++11`: GNU dialect of ISO C++11
	 * - `gnu++1y`: GNU dialect of ISO C++14 Draft
	 * - `gnu++14`: GNU dialect of ISO C++14
	 * - `gnu++1z`: GNU dialect of ISO C++17 Draft
	 * - `gnu++17`: GNU dialect of ISO C++17
	 * - `gnu++2a`: GNU dialect of ISO C++20 Draft
	 * - `gnu++20`: GNU dialect of ISO C++20
	 * - `gnu++2b`: GNU dialect of ISO C++23 Draft
	 * - `gnu++23`: GNU dialect of ISO C++23
	 */
	cppDialect(dialect: CppDialect): this;
	language(lang: string): this;
}
