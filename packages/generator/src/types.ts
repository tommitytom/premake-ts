/**
 * Shared type definitions for the parser
 */

export interface FieldDeprecation {
	message: string;
}

export interface ValueDeprecations {
	[valueName: string]: { message: string };
}

export interface PremakeField {
    allowed: string[];
    kind: string;
    name: string;
    scope: string;
    scopes: string[];
    tokens: boolean;
	fieldtype?: string;
	deprecated?: FieldDeprecation | ValueDeprecations;
}

export interface PremakeParameter {
	name: string;
	description?: string;
		options: {
		name: string;
		description?: string;
	}[];
	additional?: string;
}

export interface DocumentedField extends PremakeField {
	description: string;
	parameter: string | PremakeParameter;
	availability?: string;
	examples?: string;
	discrepancies?: string;
}

export interface SanitizedField extends DocumentedField {
	parameter: PremakeParameter;
}
