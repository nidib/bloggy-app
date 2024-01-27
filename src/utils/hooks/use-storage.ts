import { MMKVLoader, create } from 'react-native-mmkv-storage';

import { StorageKey, StorageValue } from './storage';

const MMKV = new MMKVLoader().initialize();

const useMMKV = create(MMKV);

export function useStorage(key: StorageKey, defaultValue: StorageValue) {
	const [a, setA] = useMMKV<StorageValue>(key, defaultValue);

	return [a, setA] as const;
}
