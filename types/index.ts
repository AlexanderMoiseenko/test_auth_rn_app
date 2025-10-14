import { ScreenNames } from '@/constants';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthResponse extends User {
  accessToken: string;
}

// Тип для контекста аутентификации
export interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthStackParamList = {
  [ScreenNames.Home]: undefined;
  [ScreenNames.Login]: undefined;
};

export type AppStackParamList = {
  [ScreenNames.Profile]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}