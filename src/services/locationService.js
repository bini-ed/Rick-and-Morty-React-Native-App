import axios from 'axios';
import {URL} from '../config/config';

export const getLocationService = async () => {
  let signal = axios.CancelToken.source();
  return await axios.get(`${URL}location`, {
    cancelToken: signal.token,
  });
};
