import { loginUser } from '@/api/auth';

type LogoutFunction = () => Promise<void> | void;

class AuthService {
  private logoutCallback: LogoutFunction | null = null;

  registerLogout(logoutCallback: LogoutFunction): void {
    this.logoutCallback = logoutCallback;
  }

  unregisterLogout(): void {
    this.logoutCallback = null;
  }

  async login(credentials: { username: string; password: string }) {
    return loginUser(credentials);
  }

  logout(): void {
    if (this.logoutCallback) {
      this.logoutCallback();
    } else {
      console.warn('Logout callback is not registered in AuthService.');
    }
  }
}

const authService = new AuthService();
export default authService;
