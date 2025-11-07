export interface IUser {
  email: string
  password: string
}

export interface IAuthResponse {
  success: boolean
  message: string
  user?: {
    email: string
    name: string
  }
}

export interface IAuthService {
  login(credentials: IUser): Promise<IAuthResponse>
  logout(): void
  isAuthenticated(): boolean
}
