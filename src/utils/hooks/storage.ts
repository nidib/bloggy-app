export const StorageKeyEnum = {
	BLOGGY_API_TOKEN: 'BLOGGY_API_TOKEN',
} as const;

export type StorageKey = (typeof StorageKeyEnum)[keyof typeof StorageKeyEnum];
