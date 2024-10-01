export const formatDate = (date: string) => {
	const format = {
		day: "numeric",
		month: "long",
		year: "numeric"
	} as const;

	return new Date(date).toLocaleString("es-ES", format);
};
