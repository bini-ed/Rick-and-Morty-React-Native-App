import {createSlice} from '@reduxjs/toolkit';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {apiCallBegan} from './apiAction';

const slice = createSlice({
  name: 'character',
  initialState: {
    list: [],
    next: null,
    loading: false,
    loadMore: false,
    searchload: false,
  },
  reducers: {
    characterLoading: (character, action) => {
      character.loading = true;
    },
    characterClear: (character, action) => {
      character.list = [];
    },
    characterFetch: (character, action) => {
      character.list = action.payload?.results;
      character.next = action.payload?.info.next;
      character.loading = false;
    },
    characterFetchFailed: (character, action) => {
      character.loading = false;
      Toast.show({type: 'error', text1: action.payload.error});
    },
    characterLoadMore: (character, action) => {
      character.loadMore = true;
    },
    characterFetchMore: (character, action) => {
      action.payload.results.map(items => {
        character.list.push(items);
      });
      character.next = action.payload?.info.next;
      character.loadMore = false;
    },
    characterFetchMoreFailed: (character, action) => {
      character.loadMore = false;
      Toast.show({type: 'error', text1: action.payload.error});
    },
    singleCharacterLoading: (character, action) => {
      character.searchload = true;
    },
    singleCharacterFetch: (character, action) => {
      character.list.push(action.payload);
      character.searchload = false;
    },
    singleCharacterFailed: (character, action) => {
      character.searchload = false;
      Toast.show({type: 'error', text1: action.payload.error});
    },
  },
});

export const {
  characterFetch,
  characterLoading,
  characterFetchFailed,
  characterFetchMore,
  characterFetchMoreFailed,
  characterLoadMore,
  singleCharacterFetch,
  singleCharacterFailed,
  singleCharacterLoading,
  characterClear,
} = slice.actions;
export default slice.reducer;

export const loadCharacters = () =>
  apiCallBegan({
    url: 'character',
    onStart: characterLoading.type,
    onSuccess: characterFetch.type,
    onError: characterFetchFailed.type,
  });

export const loadMoreCharacters = url =>
  apiCallBegan({
    url: url,
    onStart: characterLoadMore.type,
    onSuccess: characterFetchMore.type,
    onError: characterFetchMoreFailed.type,
  });

export const searchCharacters = params =>
  apiCallBegan({
    url: `character/?${params}`,
    onStart: characterLoading.type,
    onSuccess: characterFetch.type,
    onError: characterFetchFailed.type,
  });
export const getSingleCharacters = INCOME_URL =>
  apiCallBegan({
    url: INCOME_URL,
    onStart: singleCharacterLoading.type,
    onSuccess: singleCharacterFetch.type,
    onError: singleCharacterFailed.type,
  });
