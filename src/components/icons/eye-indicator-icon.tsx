import React, { ComponentProps } from 'react';

import { Icon } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = Partial<ComponentProps<typeof Icon>> & { shouldHide: boolean; onPress: () => void };

export function EyeIndicatorIcon(props: Props) {
	const { shouldHide, onPress, ...iconProps } = props;

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Icon {...iconProps} name={shouldHide ? 'eye' : 'eye-off'} />
		</TouchableWithoutFeedback>
	);
}
