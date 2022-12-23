import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import AppText from './AppText';

const ListItem = ({item, navigate}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('Characters', {item})}
      style={styles.locationContainer}>
      <AppText
        font={{
          color: '#156900',
          fontWeight: '600',
          fontFamily: 'serif',
          fontSize: 18,
        }}>
        {item.name}
      </AppText>
      <AppText
        font={{
          color: 'black',
          fontWeight: '200',
          fontFamily: 'serif',
          fontSize: 14,
        }}>
        {item.type}
      </AppText>
      <AppText
        font={{
          color: 'black',
          fontWeight: '200',
          fontFamily: 'serif',
          fontSize: 14,
        }}>
        {item.dimension}
      </AppText>
      <AppText
        font={{
          color: 'black',
          fontWeight: '200',
          fontFamily: 'serif',
          fontSize: 14,
        }}>
        Number of residents {item.residents?.length}
      </AppText>
    </TouchableOpacity>
  );
};

export default memo(ListItem);

const styles = StyleSheet.create({
  locationContainer: {
    marginVertical: 10,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 10,
  },
});
