import axios from 'axios';
import {URL} from '../config/config';

export const getEpisodeService = async () => {
  let signal = axios.CancelToken.source();
  return await axios.get(`${URL}episode`, {
    cancelToken: signal.token,
  });
};
