import { get, post, put, del } from './apiMethods';

export const updateProfile = (data) => post('/users/update-profile', data);

