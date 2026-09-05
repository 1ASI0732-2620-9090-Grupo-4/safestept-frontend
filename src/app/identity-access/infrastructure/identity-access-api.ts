import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { environment } from '../../../environments/environment';
import {
  AuthenticatedUserResponse,
  LogoutRequest,
  MessageResponse,
  SignedUpUserResponse,
  SignInRequest,
  SignUpRequest,
} from './authentication.resources';
import { ProfileResource, UpdateProfileRequest } from './profile.resources';

@Injectable({ providedIn: 'root' })
export class IdentityAccessApi extends BaseApi {
  constructor(http: HttpClient) {
    super();
    this.http = http;
  }

  private readonly http: HttpClient;
  private readonly baseUrl = environment.platformProviderApiBaseUrl;

  signIn(username: string, password: string): Observable<AuthenticatedUserResponse> {
    const payload: SignInRequest = { username, password };
    return this.http.post<AuthenticatedUserResponse>(`${this.baseUrl}/authentication/sign-in`, payload);
  }

  signUp(username: string, password: string): Observable<SignedUpUserResponse> {
    const payload: SignUpRequest = { username, password };
    return this.http.post<SignedUpUserResponse>(`${this.baseUrl}/authentication/sign-up`, payload);
  }

  logout(refreshToken: string): Observable<MessageResponse> {
    const payload: LogoutRequest = { refreshToken };
    return this.http.post<MessageResponse>(`${this.baseUrl}/authentication/logout`, payload);
  }

  getMyProfile(): Observable<ProfileResource> {
    return this.http.get<ProfileResource>(`${this.baseUrl}/profiles/me`);
  }

  updateMyProfile(profile: UpdateProfileRequest): Observable<ProfileResource> {
    return this.http.put<ProfileResource>(`${this.baseUrl}/profiles/me`, profile);
  }
}
