import {getRequest} from './utils';

export const getSPO2 = () => getRequest('/spo2/findall/');
