import {View, StyleSheet, Dimensions, Image} from 'react-native';
import React, {memo} from 'react';
import AppText from './AppText';

const {width} = Dimensions.get('screen');

const AppCard = ({item}) => {
  return (
    <View style={{marginVertical: 10}}>
      <Image
        source={{uri: item?.image}}
        style={{
          width: width / 2 - 20,
          height: 220,
          borderRadius: 15,
          resizeMode: 'contain',
        }}></Image>

      <View style={styles.card}>
        <AppText
          font={{
            fontSize: 15,
            fontFamily: 'serif',
            fontWeight: '600',
            alignSelf: 'center',
            color: '#156900',
          }}>
          {item?.name}
        </AppText>
        <AppText font={{fontSize: 13, alignSelf: 'center'}}>
          {item?.species}, {item?.gender}, {item?.status}
        </AppText>
        <AppText font={{fontSize: 13, alignSelf: 'center'}}>
          {item?.origin?.name}
        </AppText>
      </View>
    </View>
  );
};

export default memo(AppCard);
const styles = StyleSheet.create({
  card: {
    // marginVertical: 10,
    // backgroundColor: '#0F1A09',
    borderRadius: 10,
    width: width / 2 - 20,
  },
});
