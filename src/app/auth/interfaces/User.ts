export interface User{
    id: String;
    email: String;
    name: String;
    picture: String;
    emailVerified: boolean;
}
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  timestamp?: number;
  user?: T;     // tu back lo manda así
}
