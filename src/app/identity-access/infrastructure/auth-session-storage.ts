import { Injectable } from '@angular/core';
import { AuthenticatedUserResponse } from './authentication.resources';

const ACCESS_TOKEN_KEY = 'safestep.accessToken';
const REFRESH_TOKEN_KEY = 'safestep.refreshToken';
const USER_KEY = 'safestep.user';

@Injectable({ providedIn: 'root' })
export class AuthSessionStorage {
  getAccessToken(): string | null {
    return this.getValidToken(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.getValidToken(REFRESH_TOKEN_KEY);
  }

  getUser(): AuthenticatedUserResponse | null {
    if (!this.getAccessToken()) return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      const user = JSON.parse(raw) as AuthenticatedUserResponse;
      if (!user.token || !user.refreshToken) {
        this.clear();
        return null;
      }
      return user;
    } catch {
      this.clear();
      return null;
    }
  }

  save(user: AuthenticatedUserResponse): void {
    if (!user.token || !user.refreshToken) {
      this.clear();
      return;
    }
    localStorage.setItem(ACCESS_TOKEN_KEY, user.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, user.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  private getValidToken(key: string): string | null {
    const token = localStorage.getItem(key);
    if (!token || token === 'undefined' || token === 'null') {
      localStorage.removeItem(key);
      return null;
    }
    return token;
  }
}
