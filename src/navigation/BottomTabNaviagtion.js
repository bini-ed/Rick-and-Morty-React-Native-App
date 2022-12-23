import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import AppColor from '../config/color';

import Location from '../screen/Location';
import Characters from '../screen/Characters';
import HomePage from '../screen/HomePage';
import Iconicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

function BottomTabNaviagtion() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      style={styles.container}
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: AppColor.secondary,
        tabBarLabelStyle: {
          fontSize: 14,
          margin: 0,
          padding: 0,
          fontFamily: 'serif',
          bottom: 2,
        },
        tabBarStyle: [
          {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            height: 50,
            borderRadius: 10,
            backgroundColor: AppColor.primary,
          },
          null,
        ],
      }}>
      <BottomTab.Screen
        name="Characters"
        component={Characters}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <View
              style={
                focused
                  ? {
                      width: 60,
                      height: 60,
                      backgroundColor: focused
                        ? AppColor.secondary
                        : AppColor.primary,
                      borderRadius: 50,
                      bottom: 15,
                      borderColor: '#425F57',
                      borderWidth: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
                  : null
              }>
              <Iconicons size={size} color={color} name="person"></Iconicons>
            </View>
          ),
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}) => {
            return (
              <View
                style={
                  focused
                    ? {
                        width: 60,
                        height: 60,
                        backgroundColor: focused ? '#749F82' : '#425F57',
                        borderRadius: 50,
                        bottom: 15,
                        borderColor: '#425F57',
                        borderWidth: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : null
                }>
                <FontAwesome size={size} color={color} name="home" />
              </View>
            );
          },
        }}></BottomTab.Screen>

      <BottomTab.Screen
        name="Locations"
        component={Location}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <View
              style={
                focused
                  ? {
                      width: 60,
                      height: 60,
                      backgroundColor: focused ? '#749F82' : '#425F57',
                      borderRadius: 50,
                      bottom: 15,
                      borderColor: '#425F57',
                      borderWidth: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
                  : null
              }>
              <Iconicons
                size={size}
                color={color}
                name="location-sharp"></Iconicons>
            </View>
          ),
        }}></BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

export default BottomTabNaviagtion;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
});
