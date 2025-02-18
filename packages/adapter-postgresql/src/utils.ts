const createPreparedStatementHelper = (
	placeholder: (index: number) => string
) => {
	const helper = (
		values: Record<string, any>
	): readonly [fields: string[], placeholders: string[], arguments: any[]] => {
		const keys = Object.keys(values);
		return [
			keys.map((k) => escapeName(k)),
			keys.map((_, i) => placeholder(i)),
			keys.map((k) => values[k])
		] as const;
	};
	return helper;
};

const ESCAPE_CHAR = `"`;

export const escapeName = (val: string) => {
	return `${ESCAPE_CHAR}${val}${ESCAPE_CHAR}`;
};

export const helper = createPreparedStatementHelper((i) => `$${i + 1}`);

export const getSetArgs = (fields: string[], placeholders: string[]) => {
	return fields
		.map((field, i) => [field, placeholders[i]].join(" = "))
		.join(",");
};
