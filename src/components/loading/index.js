import React from 'react'
import { Skeleton } from '@chakra-ui/react'

export const Loading = ( {isLoading, children} ) => {
	return (
		<Skeleton 
			isLoaded={!isLoading} 
			startColor="pink.500" 
			endColor="orange.500"
			fadeDuration={0.4}
			speed={0.8}
		>
			{children}
		</Skeleton>
	);
};
