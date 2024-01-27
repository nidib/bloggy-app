import z from 'zod';

const REQUIRED_FIELD_MESSAGE = 'Campo obrigatório';

export const signupSchema = z.object({
	fullName: z
		.string()
		.transform(value => value.trim())
		.pipe(z.string().min(1, { message: REQUIRED_FIELD_MESSAGE })),
	username: z
		.string()
		.transform(value => value.replaceAll(' ', ''))
		.pipe(z.string().min(1, { message: REQUIRED_FIELD_MESSAGE })),
	password: z
		.string()
		.transform(value => value.replace(' ', ''))
		.pipe(z.string().min(1, { message: REQUIRED_FIELD_MESSAGE })),
});

export type SignupSchema = z.infer<typeof signupSchema>;
