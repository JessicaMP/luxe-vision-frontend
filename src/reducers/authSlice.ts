import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/auth";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";

interface AuthState {
  token: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);
      const token = response.data.jwt; // Asegúrate de que el backend envíe el token aquí
    if (token) {
      localStorage.setItem("token", token); // Guardar el token en localStorage
      console.log("Token guardado en login:", localStorage.getItem("token")); // Verificar almacenamiento
    }
    return { token, user: response.data.user };
    } catch (error: any) {
      // Verificar si el error es de Axios y contiene respuesta
      if (error.response && error.response.data && error.response.data.message) {
        // Pasar el mensaje del backend
        return rejectWithValue(error.response.data.message);
      } else {
        // Mensaje de error genérico en caso de que no haya respuesta específica
        return rejectWithValue("Error de log in: Por favor intenta nuevamente.");
      }
    }
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (
    userData: { firstName: string; lastName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.register(userData);
      const token = response.data.jwt; // Asegúrate de que el backend envíe el token aquí
    if (token) {
      localStorage.setItem("token", token); // Guardar el token en localStorage
      console.log("Token guardado en register:", localStorage.getItem("token")); // Verificar almacenamiento
    }
    return { token, user: response.data.user };
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Error de registro: Por favor intenta nuevamente.");
      }
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.getProfile();
      console.log("Perfil de usuario obtenido:", response.data);
      return response.data; 
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue("Error al obtener el perfil del usuario.");
      }
    }
  }
);



const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const jwtToken = action.payload.jwt || action.payload.token; // dependiendo de tu API
        if (jwtToken) {
            localStorage.setItem("token", jwtToken);
            console.log("Token guardado después del login:", localStorage.getItem("token"));
        }
        state.loading = false;
        state.token = jwtToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.jwt;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        console.log("Usuario cargado:", action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;



