import React from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@ui-kitten/components';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Header } from '../../components/layouts/header';
import { Page } from '../../components/layouts/page';
import { TouchableIcon } from '../../components/touchable-icon';
import { ArticleStackProps } from './_article-stack';

const createOrEditArticleSchema = z.object({
	title: z
		.string()
		.transform(value => value.replaceAll(' ', ''))
		.pipe(
			z
				.string()
				.min(1, { message: 'Campo obrigatório' })
				.max(100, { message: 'Quantidade máxima de caracteres: 100' })
		),
	content: z
		.string()
		.transform(value => value.replaceAll(' ', ''))
		.pipe(z.string().min(1, { message: 'Campo obrigatório' })),
});

type CreateOrEditArticleSchema = z.infer<typeof createOrEditArticleSchema>;

type Props = ArticleStackProps<'ArticleEditor'>;

export function ArticleEditorPage(props: Props) {
	const { handleSubmit, control } = useForm<CreateOrEditArticleSchema>({
		resolver: zodResolver(createOrEditArticleSchema),
		defaultValues: {
			title: '',
			content: '',
		},
	});
	const isEditing = Boolean(props.route.params?.articleId);

	const submitArticle = (formState: CreateOrEditArticleSchema) => {
		console.log(formState);
	};

	return (
		<Page>
			<ScrollView>
				<Header
					title={isEditing ? 'Editar' : 'Criar'}
					rightContent={
						<TouchableIcon
							icon="paper-plane-outline"
							onPress={() => {
								Keyboard.dismiss();
								handleSubmit(submitArticle)();
							}}
						>
							Publicar
						</TouchableIcon>
					}
				/>
				<View style={styles.form}>
					<Controller
						name="title"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field, fieldState }) => (
							<Input
								size="large"
								textContentType="username"
								label="TÍTULO"
								autoCapitalize="none"
								autoCorrect={false}
								status={fieldState.invalid ? 'danger' : 'basic'}
								caption={fieldState.error?.message}
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								ref={field.ref}
							/>
						)}
					/>
					<Controller
						name="content"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field, fieldState }) => (
							<Input
								size="large"
								textContentType="username"
								label="CONTEÚDO"
								autoCapitalize="none"
								autoCorrect={false}
								numberOfLines={10}
								textStyle={styles.contentInput}
								status={fieldState.invalid ? 'danger' : 'basic'}
								caption={fieldState.error?.message}
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								ref={field.ref}
								multiline
							/>
						)}
					/>
				</View>
			</ScrollView>
		</Page>
	);
}

const styles = StyleSheet.create({
	form: {
		gap: 30,
	},
	contentInput: {
		minHeight: 450,
	},
});
