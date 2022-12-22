import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppText = ({children, font}) => {
  return <Text style={[styles.text, font]}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: Platform.OS == 'android' ? 'Roboto' : 'Avenir',
    color: 'black',
  },
});
