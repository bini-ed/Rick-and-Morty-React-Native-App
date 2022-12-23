import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import AppText from '../components/AppText';
import {fetchLocation, fetchMoreLocation} from '../store/locationState';
import ListItem from '../components/ListItem';

const Location = () => {
  const [refresh, setRefresh] = useState(false);
  const {navigate} = useNavigation();
  const {list, loading, loadMore, next} = useSelector(state => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  const handelRefresh = () => {
    setRefresh(true);
    dispatch(fetchLocation());
    setRefresh(false);
  };

  const loadMoreFunc = async () => {
    if (next != null)
      dispatch(fetchMoreLocation(next.replace('http:', 'https:')));
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {loading ? (
        <ActivityIndicator animating={loading} color="lightblue" size={30} />
      ) : (
        <>
          <FlatList
            data={list}
            style={{
              flexGrow: 1,
            }}
            onEndReached={() => {
              loadMoreFunc();
            }}
            ListHeaderComponent={
              <AppText
                font={{
                  color: '#25A1C7',
                  fontSize: 35,
                  fontFamily: 'serif',
                  fontWeight: '500',
                }}>
                Locations
              </AppText>
            }
            onEndReachedThreshold={0.7}
            renderItem={({item}) => (
              <ListItem item={item} navigate={navigate} />
            )}
            keyExtractor={item => item.id.toString()}
            removeClippedSubviews={true}
            initialNumToRender={2} // Reduce initial render amount
            // maxToRenderPerBatch={1} // Reduce number in each render batch
            refreshing={refresh}
            onRefresh={handelRefresh}
          />

          {loadMore && (
            <ActivityIndicator
              style={{marginBottom: 70}}
              animating={loadMore}
              size={35}
              color="green"
            />
          )}
        </>
      )}
    </View>
  );
};

export default Location;
