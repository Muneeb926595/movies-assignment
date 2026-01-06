import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useReactNavigationDevTools } from '@rozenite/react-navigation-plugin';

import { navigationRef } from './navigation-utils';
import { MainStackParamList } from './types';
import { hideSplash } from 'react-native-splash-view';
import { TabsNavigator } from './tab-navigator';
import { MovieDetailScreen } from '../views/screens';

const MainAppStack = createNativeStackNavigator<MainStackParamList>();

export const AppNavigator = () => {
  useReactNavigationDevTools({ ref: navigationRef });

  useEffect(() => {
    // Hide splash screen after navigation is ready
    const timer = setTimeout(() => {
      hideSplash();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainAppStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <MainAppStack.Screen name="Main" component={TabsNavigator} />
        <MainAppStack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </MainAppStack.Navigator>
    </NavigationContainer>
  );
};
