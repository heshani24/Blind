import {postRequest} from './utils';

export const authRegAPI = data => postRequest('/auth/users/', data);
