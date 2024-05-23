export interface UserStore {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  username: string;
}
