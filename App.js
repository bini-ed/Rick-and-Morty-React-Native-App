import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/store/store';
import BottomTabNaviagtion from './src/navigation/BottomTabNaviagtion';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />

            <BottomTabNaviagtion />
          </NavigationContainer>
          <Toast />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
