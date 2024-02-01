import React, { ComponentProps } from 'react';
import { View } from 'react-native';

import * as eva from '@eva-design/eva';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { sub } from 'date-fns';

import { ArticleCard } from './article-card';

function getComponent(props: ComponentProps<typeof ArticleCard>) {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<View />
				<ArticleCard {...props} />
			</ApplicationProvider>
		</>
	);
}

describe('ArticleCard', () => {
	it('Should render the article title', async () => {
		const title = 'A necessidade da faculdade para desenvolvedores';
		render(
			getComponent({
				title,
				id: 'ccae898f-e315-4739-bae9-f7e0ca02fffe',
				author: {
					id: '332c8361-8da6-453c-95f2-a9e6cf809d31',
					fullName: 'John Doe',
				},
				createdAt: new Date().toISOString(),
				onCardPress: () => {},
				onAuthorPress: () => {},
			})
		);

		expect(await screen.findByText(title)).toBeOnTheScreen();
	});

	it('Should render the author name', async () => {
		const name = 'John Doe';
		render(
			getComponent({
				title: 'A necessidade da faculdade para desenvolvedores',
				id: 'ccae898f-e315-4739-bae9-f7e0ca02fffe',
				author: {
					id: '332c8361-8da6-453c-95f2-a9e6cf809d31',
					fullName: name,
				},
				createdAt: new Date().toISOString(),
				onCardPress: () => {},
				onAuthorPress: () => {},
			})
		);

		expect(await screen.findByText(name)).toBeOnTheScreen();
	});

	it("Should render the letter of the author's first name", async () => {
		const name = 'John Doe';
		render(
			getComponent({
				title: 'A necessidade da faculdade para desenvolvedores',
				id: 'ccae898f-e315-4739-bae9-f7e0ca02fffe',
				author: {
					id: '332c8361-8da6-453c-95f2-a9e6cf809d31',
					fullName: name,
				},
				createdAt: new Date().toISOString(),
				onCardPress: () => {},
				onAuthorPress: () => {},
			})
		);

		expect(await screen.findByRole('image', { name: 'J' })).toBeOnTheScreen();
	});

	it('Should render when the article was published', async () => {
		const yesterday = sub(new Date(), { days: 1 });

		render(
			getComponent({
				title: 'A necessidade da faculdade para desenvolvedores',

				id: 'ccae898f-e315-4739-bae9-f7e0ca02fffe',
				author: {
					id: '332c8361-8da6-453c-95f2-a9e6cf809d31',
					fullName: 'John Doe',
				},
				createdAt: yesterday.toISOString(),
				onCardPress: () => {},
				onAuthorPress: () => {},
			})
		);

		expect(await screen.findByText('há 1 dia')).toBeOnTheScreen();
	});

	it('Should call onCardPress with the article id when pressing on the card', async () => {
		const id = 'ccae898f-e315-4739-bae9-f7e0ca02fffe';
		const onCardPressSpy = jest.fn();
		render(
			getComponent({
				id,
				title: 'A necessidade da faculdade para desenvolvedores',

				author: {
					id: '332c8361-8da6-453c-95f2-a9e6cf809d31',
					fullName: 'John Doe',
				},
				createdAt: new Date().toISOString(),
				onCardPress: onCardPressSpy,
				onAuthorPress: () => {},
			})
		);

		fireEvent.press(await screen.findByText('A necessidade da faculdade para desenvolvedores'));

		expect(onCardPressSpy).toHaveBeenCalledTimes(1);
		expect(onCardPressSpy).toHaveBeenCalledWith(id);
	});

	it('Should call onAuthorPress with the author when pressing on the author info', async () => {
		const author = {
			id: '332c8361-8da6-453c-95f2-a9e6cf809d31',
			fullName: 'John Doe',
		};
		const onAuthorPressSpy = jest.fn();
		render(
			getComponent({
				author,
				id: 'ccae898f-e315-4739-bae9-f7e0ca02fffe',
				title: 'A necessidade da faculdade para desenvolvedores',

				createdAt: new Date().toISOString(),
				onCardPress: () => {},
				onAuthorPress: onAuthorPressSpy,
			})
		);

		fireEvent.press(await screen.findByText('John Doe'));

		expect(onAuthorPressSpy).toHaveBeenCalledTimes(1);
		expect(onAuthorPressSpy).toHaveBeenCalledWith(author);
	});
});
