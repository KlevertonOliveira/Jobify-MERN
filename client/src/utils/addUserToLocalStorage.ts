import { User } from '../types/User';

export function addUserToLocalStorage(user: User, token: string, location: string) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('location', location);
}