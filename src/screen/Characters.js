import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';

import {
  getCharacterService,
  getSingleCharacterService,
  searchCharacterService,
} from '../services/characterService';

import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppColor from '../config/color';

const {width} = Dimensions.get('screen');
const Characters = () => {
  const [character, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [nextURL, setNextURL] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const {params} = useRoute();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Select filter', value: ''},
    {label: 'Status', value: 'status'},
    {label: 'Species', value: 'species'},
    {label: 'Gender', value: 'gender'},
  ]);
  let newPeople = [];

  useEffect(() => {
    if (params?.item?.residents?.length) {
      params?.item?.residents?.map((residents, index) => {
        getSingleCharacter(residents);
      });
      setCharacters(newPeople);
    } else {
      search.length == 0 ? getCharacter() : handleSearch();
    }
  }, [params?.item?.id]);

  const handelRefresh = () => {
    setRefresh(true);
    getCharacter();
    setRefresh(false);
  };

  const getSingleCharacter = async INCOME_URL => {
    setLoading(true);
    try {
      const {data} = await getSingleCharacterService(INCOME_URL);
      if (data) {
        newPeople.push(data);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.error ?? 'Error occured',
      });
    }
    setLoading(false);
  };
  const getCharacter = async () => {
    setValue('');
    setSearch('');
    setLoading(true);
    try {
      const {data} = await getCharacterService();
      if (data.results) {
        setCharacters(data.results);
      }
      data.info.next ? setNextURL(data.info.next) : setNextURL(null);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.error ?? 'Error occured',
      });
    }
    setLoading(false);
  };

  const loadMore = async () => {
    setLoadmore(true);
    if (nextURL !== null) {
      try {
        const res = await axios.get(nextURL.replace('http:', 'https:'), {});
        const {results} = res.data;
        if (results.length > 0) setCharacters([...character, ...results]);
        setNextURL(res.data.info.next);
        setLoadmore(false);
      } catch (err) {
        setLoadmore(false);
        console.log('load more error:', err);
      }
    } else {
      setLoadmore(false);
    }
  };

  const handleSearch = async () => {
    if (search.length) {
      setSearchLoading(true);
      try {
        const filter = value ? value : 'name';
        const {data} = await searchCharacterService(filter, search);
        if (data.results) {
          setCharacters(data.results);
        }
        data.info.next ? setNextURL(data.info.next) : setNextURL(null);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.error ?? 'Error occured',
        });
        console.log('error', error.response.data.error);
      }
      setSearchLoading(false);
    } else {
      Toast.show({
        type: 'info',
        text1: 'Empty search field',
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading || searchLoading ? (
        <ActivityIndicator
          animating={loading || searchLoading}
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
                // color: '#25A1C7',
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

              {value ? (
                <AppText> filter by {value} </AppText>
              ) : params?.item?.residents?.length ? (
                <AppText> filter by location {params?.item?.name}</AppText>
              ) : (
                ''
              )}
            </View>
          </View>
          {character.length ? (
            <>
              <FlatList
                data={character}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                style={{
                  flexGrow: 1,
                  marginBottom: 90,
                }}
                numColumns={2}
                onEndReached={() => {
                  params?.item?.residents?.length ? null : loadMore();
                }}
                ListHeaderComponentStyle={{zIndex: 1, backgroundColor: 'red'}}
                onEndReachedThreshold={0.7}
                renderItem={({item}) => <AppCard item={item} />}
                keyExtractor={item => item.id.toString()}
                removeClippedSubviews={true}
                initialNumToRender={2} // Reduce initial render amount
                // maxToRenderPerBatch={1} // Reduce number in each render batch
                refreshing={refresh}
                onRefresh={handelRefresh}
              />

              {loadmore && (
                <ActivityIndicator
                  style={{marginBottom: 70}}
                  animating={loadmore}
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
                  getCharacter();
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
