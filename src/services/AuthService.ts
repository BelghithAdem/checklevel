import type { IAuthService, IUser, IAuthResponse } from '@/interfaces/IAuth'

// Mock data for authentication
const MOCK_USERS = [
  {
    email: 'admin',
    password: 'admin@1234',
    name: 'Administrator',
  },
]

export class AuthService implements IAuthService {
  private static instance: AuthService
  private authenticated = false

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public async login(credentials: IUser): Promise<IAuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = MOCK_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    )

    if (user) {
      this.authenticated = true
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify({ email: user.email, name: user.name }))

      return {
        success: true,
        message: 'Login successful',
        user: {
          email: user.email,
          name: user.name,
        },
      }
    }

    return {
      success: false,
      message: 'Invalid credentials. Please try again.',
    }
  }

  public logout(): void {
    this.authenticated = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  public isAuthenticated(): boolean {
    return this.authenticated || localStorage.getItem('isAuthenticated') === 'true'
  }
}

export const authService = AuthService.getInstance()
