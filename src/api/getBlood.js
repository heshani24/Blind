import {getRequest} from './utils';

export const getBlood = () => getRequest('/blood/findall/');
