import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useReactNavigationDevTools } from '@rozenite/react-navigation-plugin';

import { navigationRef } from './navigation-utils';
import { MainStackParamList } from './types';
import { hideSplash } from 'react-native-splash-view';
import { TabsNavigator } from './tab-navigator';
import { MovieDetailScreen } from '../views/screens/movies';

const MainAppStack = createNativeStackNavigator<MainStackParamList>();

export const AppNavigator = () => {
  const routeNameRef = useRef<any>(null);

  useReactNavigationDevTools({ ref: navigationRef });

  useEffect(() => {
    // Hide splash screen after navigation is ready
    const timer = setTimeout(() => {
      hideSplash();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // Track screen view here if needed
        }
        routeNameRef.current = currentRouteName;
      }}
    >
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
