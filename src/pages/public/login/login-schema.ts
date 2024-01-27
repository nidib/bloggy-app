import z from 'zod';

const REQUIRED_FIELD_MESSAGE = 'Campo obrigatório';

export const loginSchema = z.object({
	username: z
		.string()
		.transform(value => value.replaceAll(' ', ''))
		.pipe(z.string().min(1, { message: REQUIRED_FIELD_MESSAGE })),
	password: z
		.string()
		.transform(value => value.replace(' ', ''))
		.pipe(z.string().min(1, { message: REQUIRED_FIELD_MESSAGE })),
});

export type LoginSchema = z.infer<typeof loginSchema>;
