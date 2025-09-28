export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

export interface UsersState {
  list: User[];
  loading: boolean;
  error?: string | null;
}
