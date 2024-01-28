import { MMKVLoader, create } from 'react-native-mmkv-storage';

import { StorageKey } from './storage';

const MMKV = new MMKVLoader().initialize();

const useMMKV = create(MMKV);

export function useStorage<T>(key: StorageKey, defaultValue: T) {
	const [a, setA] = useMMKV<T>(key, defaultValue);

	return [a, setA] as const;
}
