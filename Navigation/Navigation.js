import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import {Image, View} from 'react-native';
import {color} from '../Const/Color';
import Profile from '../Pages/Profile';
import Post from '../Pages/Post';
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.black,
          borderTopWidth: 0.26,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        tabBarItemStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: 'https://i.ibb.co/DD0gmYp/home.png'}}
              style={{width: 20, aspectRatio: 1, tintColor: 'white'}}
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: 'https://i.ibb.co/WWg5vdF/plus.png'}}
              style={{width: 20, aspectRatio: 1, tintColor: 'white'}}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: 'https://i.ibb.co/9Vck1rW/people.png'}}
              style={{width: 23, aspectRatio: 1, tintColor: 'white'}}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
};
const Navigation = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
