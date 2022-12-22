import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import Rick from '../assets/rick.png';
import Home from '../assets/home.png';
import LocationImg from '../assets/location.png';

import Location from '../screen/Location';
import Characters from '../screen/Characters';
import HomePage from '../screen/HomePage';

function BottomTabNaviagtion() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      style={styles.container}
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'lightgrey',
        tabBarLabelStyle: {
          fontSize: 14,
          margin: 0,
          padding: 0,
          fontFamily: 'serif',
          bottom: 2,
        },
        tabBarStyle: [
          {
            display: 'flex',
            height: 50,
            backgroundColor: '#25A1C7',
          },
          null,
        ],
      }}>
      <BottomTab.Screen
        name="Characters"
        component={Characters}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={Rick}
              style={{
                width: 30,
                height: 30,
                paddingTop: 10,
                resizeMode: 'contain',
              }}></Image>
          ),
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIconStyle: {
            backgroundColor: 'white',
            width: 80,
            height: 80,
            borderRadius: 50,
          },
          tabBarIcon: () => (
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'white',
                borderRadius: 40,
                bottom: 25,
                borderColor: '#25A1C7',
                borderWidth: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={Home}
                style={{
                  width: 30,
                  height: 30,
                  paddingTop: 10,
                  resizeMode: 'contain',
                }}></Image>
            </View>
          ),
        }}></BottomTab.Screen>

      <BottomTab.Screen
        name="Locations"
        component={Location}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={LocationImg}
              style={{
                width: 30,
                height: 30,
                paddingTop: 10,
                resizeMode: 'contain',
              }}></Image>
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
