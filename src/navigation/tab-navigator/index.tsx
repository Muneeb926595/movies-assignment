import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainBottomTabsParamList, MainStackParamList } from '../types';
import { ComponentType } from 'react';
import {
  MoviesScreen,
  FavouritesScreen,
  SearchScreen,
} from '../../views/screens/movies';
import { useTheme } from 'styled-components/native';
import { Layout } from '../../globals';
import { AppIcon } from '../../views/components';
import { AppIconName, AppIconSize } from '../../views/components/icon/types';

const MainTabs = createBottomTabNavigator<MainBottomTabsParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

// Generic stack navigator creator to avoid repetition
const createStackNavigator = (
  screenName: string,
  component: ComponentType<any>,
) => {
  const StackNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenName as any}
        component={component}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
  return StackNavigator;
};

const MoviesStack = createStackNavigator('Movies', MoviesScreen);
const FavouritesStack = createStackNavigator('Favourites', FavouritesScreen);
const SearchStack = createStackNavigator('Search', SearchScreen);

// Tab configuration
type TabConfig = {
  name: keyof MainBottomTabsParamList;
  component: ComponentType<any>;
  icon: AppIconName;
  label: string;
};

const TAB_CONFIG: TabConfig[] = [
  {
    name: 'Movies',
    component: MoviesStack,
    icon: AppIconName.homeTab,
    label: 'Movies',
  },
  {
    name: 'Favourites',
    component: FavouritesStack,
    icon: AppIconName.user, // You can change this to a heart icon if available
    label: 'Favourites',
  },
  {
    name: 'Search',
    component: SearchStack,
    icon: AppIconName.filter,
    label: 'Search',
  },
];

const renderTabIcon = (iconName: AppIconName, color: string) => (
  <AppIcon name={iconName} iconSize={AppIconSize.medium} color={color} />
);

export const TabsNavigator = () => {
  const theme = useTheme();

  return (
    <MainTabs.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: theme.colors.brand.DEFAULT,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: {
          backgroundColor: theme.colors.surface['100'],
          paddingTop: Layout.heightPercentageToDP(0.6),
        },
      }}
    >
      {TAB_CONFIG.map(tab => (
        <MainTabs.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarLabel: tab.label,
            tabBarIcon: ({ color }) => renderTabIcon(tab.icon, color),
          }}
        />
      ))}
    </MainTabs.Navigator>
  );
};
