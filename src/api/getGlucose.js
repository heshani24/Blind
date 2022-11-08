import {getRequest} from './utils';

export const getGlucose = () => getRequest('/glucose/findall/');
