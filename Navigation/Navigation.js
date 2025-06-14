import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import {Dimensions, Image, View, Platform} from 'react-native';
import {color} from '../Const/Color';
import Profile from '../Pages/Profile';
import Post from '../Pages/Post';
import SignIn from '../LoginSystem/SignIn';
import Splash from '../LoginSystem/Splash';
import SignupScreen from '../LoginSystem/SignUpScreen';
import GoBackArrow from '../Components/GoBackArrow';
import LeaderBoard from '../Pages/LeaderBoard';
import UserProfile from '../Pages/UserProfile';
import ChatRoom from '../Pages/ChatRoom';
const {width, height} = Dimensions.get('window');
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(0, 0, 0)',
          borderTopWidth: 0,
          height: height * 0.085, // slightly more height
          paddingBottom: Platform.OS === 'android' ? 6 : 20,
          // borderWidth: 2,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 6,
        },
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.47)',
        tabBarActiveTintColor: color.white,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={{uri: 'https://i.ibb.co/DD0gmYp/home.png'}}
              style={{
                width: 22,
                aspectRatio: 1,
                tintColor: color,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          animation: 'fade',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={{uri: 'https://i.ibb.co/WWg5vdF/plus.png'}}
              style={{
                width: 20,
                aspectRatio: 1,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          animation: 'fade',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={{uri: 'https://i.ibb.co/9Vck1rW/people.png'}}
              style={{
                width: 25,
                aspectRatio: 1,
                tintColor: color,
              }}
            />
          ),
          // tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="goBack"
        component={GoBackArrow}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="leaderBoard"
        component={LeaderBoard}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="chatRoom"
        component={ChatRoom}
        options={{animation: 'slide_from_right'}}
      />
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
