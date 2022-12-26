import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';

import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppColor from '../config/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  characterClear,
  getSingleCharacters,
  loadCharacters,
  loadMoreCharacters,
  searchCharacters,
} from '../store/characterState';

const Characters = () => {
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Name', value: 'name'},
    {label: 'Status', value: 'status'},
    {label: 'Species', value: 'species'},
    {label: 'Gender', value: 'gender'},
  ]);
  const dispatch = useDispatch();
  const {params} = useRoute();
  const navigation = useNavigation();
  const {list, loading, next, loadMore, searchload} = useSelector(
    state => state.character,
  );

  useEffect(() => {
    if (params?.item?.residents?.length) {
      dispatch(characterClear());
      params?.item?.residents?.map((residents, index) => {
        dispatch(getSingleCharacters(residents));
      });
    } else {
      search.length == 0 ? dispatch(loadCharacters()) : handleSearch();
    }
  }, [params?.item?.residents?.length]);

  useEffect(() => {
    dispatch(characterClear());
  }, []);

  const handelRefresh = () => {
    setRefresh(true);
    navigation.setParams({item: {}});
    setValue(null);
    dispatch(loadCharacters());
    setRefresh(false);
  };

  const loadMoreFunc = async () => {
    if (next != null)
      dispatch(loadMoreCharacters(next.replace('http:', 'https:+5656as')));
  };

  const handleSearch = async () => {
    const filter = value ? value : 'name';
    if (search.length) {
      dispatch(searchCharacters(`${filter}=${search}`));
    } else {
      Toast.show({
        type: 'info',
        text1: 'Empty search field',
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading || searchload ? (
        <ActivityIndicator
          animating={loading || searchload}
          size={35}
          color="green"
        />
      ) : (
        <>
          <View
            style={{
              height: 180,
            }}>
            <AppText
              font={{
                color: AppColor.primary,
                fontSize: 35,
                fontFamily: 'serif',
                fontWeight: '500',
              }}>
              Characters
            </AppText>
            <AppTextInput
              value={search}
              handleSearch={handleSearch}
              onChangeText={setSearch}
            />
            <AppText
              font={{
                fontSize: 14,
                color: AppColor.primary,
                fontWeight: '600',
                paddingHorizontal: 1,
              }}>
              Filter
            </AppText>
            <View style={{flexGrow: 1, flex: 1, zIndex: 100}}>
              <DropDownPicker
                style={{
                  borderColor: AppColor.primary,
                  borderWidth: 1.5,
                }}
                placeholder="Sealect Filter"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={() => navigation.setParams({item: {}})}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              {search ? (
                <AppText
                  font={{
                    fontSize: 14,
                    color: '#156900',
                  }}>
                  Searching for {search}
                </AppText>
              ) : (
                ''
              )}

              {value && search ? (
                <AppText> filter by {value} </AppText>
              ) : params?.item?.residents?.length ? (
                <AppText> filter by location {params?.item?.name}</AppText>
              ) : (
                ''
              )}
            </View>
          </View>
          {list?.length ? (
            <>
              <FlatList
                data={list}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                style={{
                  flexGrow: 1,
                  // marginBottom: 90,
                }}
                numColumns={2}
                onEndReached={() => {
                  params?.item?.residents?.length ? null : loadMoreFunc();
                }}
                ListHeaderComponentStyle={{zIndex: 1, backgroundColor: 'red'}}
                onEndReachedThreshold={0.8}
                renderItem={({item}) => (
                  <AppCard navigation={navigation} item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
                initialNumToRender={7} // Reduce initial render amount
                // maxToRenderPerBatch={1} // Reduce number in each render batch
                refreshing={refresh}
                onRefresh={handelRefresh}
              />

              {loadMore && (
                <ActivityIndicator
                  style={{marginBottom: 70}}
                  animating={loadMore}
                  size={45}
                  color={AppColor.primary}
                />
              )}
            </>
          ) : (
            <View style={styles.retryContainer}>
              <AppText
                font={{
                  fontSize: 14,
                  color: '#156900',
                }}>
                No Character Found
              </AppText>
              <TouchableOpacity
                onPress={() => {
                  dispatch(loadCharacters());
                  setSearch('');
                  setValue('');
                }}
                style={styles.retryBtn}>
                <AppText
                  font={{
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Try Again
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Characters;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  retryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryBtn: {
    backgroundColor: '#156900',
    padding: 10,
    width: '40%',
    borderRadius: 20,
    marginVertical: 10,
  },
});
