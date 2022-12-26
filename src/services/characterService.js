import axios from 'axios';
import {URL} from '../config/config';

export const getCharacterService = async () => {
  let signal = axios.CancelToken.source();
  return await axios.get(`${URL}character`, {
    cancelToken: signal.token,
  });
};
export const getSingleCharacterService = async INCOME_URL => {
  let signal = axios.CancelToken.source();
  return await axios.get(INCOME_URL, {
    cancelToken: signal.token,
  });
};
export const getCharacterDetailService = async id => {
  let signal = axios.CancelToken.source();
  return await axios.get(`${URL}charcters/${id}`, {
    cancelToken: signal.token,
  });
};
export const searchCharacterService = async (filter, name) => {
  let signal = axios.CancelToken.source();
  return await axios.get(`${URL}character/?${filter}=${name}`, {
    cancelToken: signal.token,
  });
};
