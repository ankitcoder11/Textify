import { get, post, put, del } from './apiMethods';

// login
export const loginUsers = (data) => post('/users/login', data);

// signup
export const registerUsers = (data) => post('/users/register', data);

// otp
export const otpVerifyApi = (data) => post('/users/verify-otp', data);

// forgot-password
export const forgotPassword = (data) => post('/users/forgot-password', data);

// reset-password
export const resetPassword = (data) => post('/users/reset-password', data);

// Fetch a single user by ID
export const fetchUserById = (id) => get(`/users/${id}`);

// Create a new user
export const createUser = (data) => post('/users', data);

// Update an existing user by ID
export const updateUser = (id, data) => put(`/users/${id}`, data);

// Delete a user by ID
export const deleteUser = (id) => del(`/users/${id}`);
