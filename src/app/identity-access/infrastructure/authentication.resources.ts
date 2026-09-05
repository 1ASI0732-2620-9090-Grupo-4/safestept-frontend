export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
}

export interface AuthenticatedUserResponse {
  id: number;
  username: string;
  token: string;
  refreshToken: string;
}

export interface SignedUpUserResponse {
  id: number;
  username: string;
  roles: string[];
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface MessageResponse {
  message: string;
}
