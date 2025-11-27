/**
 * Shared type definitions for the parser
 */

export interface PremakeField {
    allowed: string[];
    kind: string;
    name: string;
    scope: string;
    scopes: string[];
    tokens: boolean;
	fieldtype?: string;
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
