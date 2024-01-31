export const StorageKeyEnum = {
	BLOGGY_API_TOKEN: 'BLOGGY_API_TOKEN',
	LOGGED_USER_ID: 'LOGGED_USER_ID',
} as const;

export type StorageKey = (typeof StorageKeyEnum)[keyof typeof StorageKeyEnum];
