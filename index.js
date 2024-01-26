import { name as appName } from './app.json';
import { App } from './src/app';
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent(appName, () => App);
