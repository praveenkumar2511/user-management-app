export interface AuthState {
  token: string | null;
  user?: { id: string; email: string; name?: string } | null;
  loading: boolean;
  error?: string | null;
}
