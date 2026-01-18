import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../app/api';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const getInitialUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }) => {
    const response = await api.post<{ user: User; accessToken: string }>(
      '/api/auth/register',
      credentials
    );
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await api.post<{ user: User; accessToken: string }>(
      '/api/auth/login',
      credentials
    );
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.post('/api/auth/logout');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
});

export const refreshToken = createAsyncThunk('auth/refresh', async () => {
  const response = await api.post<{ accessToken: string }>('/api/auth/refresh');
  localStorage.setItem('accessToken', response.accessToken);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload);
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
    syncAuthFromStorage: (state) => {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      if (token) {
        state.accessToken = token;
        state.isAuthenticated = true;
        if (userStr) {
          try {
            state.user = JSON.parse(userStr);
          } catch {
            state.user = null;
          }
        }
      } else {
        state.accessToken = null;
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      });
  },
});

export const { setAccessToken, clearAuth, syncAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
