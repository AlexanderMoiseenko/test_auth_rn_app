type LogoutFunction = () => Promise<void> | void;

class AuthService {
  private logoutCallback: LogoutFunction | null = null;

  register(logoutCallback: LogoutFunction): void {
    this.logoutCallback = logoutCallback;
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
