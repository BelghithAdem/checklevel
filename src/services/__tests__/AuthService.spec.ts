import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { AuthService } from '../AuthService'
import type { IUser } from '@/interfaces/IAuth'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = AuthService.getInstance()
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    authService.logout()
    localStorage.clear()
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = AuthService.getInstance()
      const instance2 = AuthService.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const credentials: IUser = {
        email: 'admin',
        password: 'admin@1234',
      }

      const response = await authService.login(credentials)

      expect(response.success).toBe(true)
      expect(response.message).toBe('Login successful')
      expect(response.user?.email).toBe('admin')
      expect(response.user?.name).toBe('Administrator')
      expect(localStorage.getItem('isAuthenticated')).toBe('true')
    })

    it('should fail login with invalid email', async () => {
      const credentials: IUser = {
        email: 'wronguser',
        password: 'admin@1234',
      }

      const response = await authService.login(credentials)

      expect(response.success).toBe(false)
      expect(response.message).toBe('Invalid credentials. Please try again.')
      expect(response.user).toBeUndefined()
      expect(localStorage.getItem('isAuthenticated')).toBeNull()
    })

    it('should fail login with invalid password', async () => {
      const credentials: IUser = {
        email: 'admin',
        password: 'wrongpassword',
      }

      const response = await authService.login(credentials)

      expect(response.success).toBe(false)
      expect(response.message).toBe('Invalid credentials. Please try again.')
      expect(response.user).toBeUndefined()
    })

    it('should store user data in localStorage on successful login', async () => {
      const credentials: IUser = {
        email: 'admin',
        password: 'admin@1234',
      }

      await authService.login(credentials)

      const storedUser = localStorage.getItem('user')
      expect(storedUser).not.toBeNull()

      const userData = JSON.parse(storedUser!)
      expect(userData.email).toBe('admin')
      expect(userData.name).toBe('Administrator')
    })
  })

  describe('logout', () => {
    it('should clear authentication state', async () => {
      // First login
      await authService.login({ email: 'admin', password: 'admin@1234' })
      expect(authService.isAuthenticated()).toBe(true)

      // Then logout
      authService.logout()
      expect(authService.isAuthenticated()).toBe(false)
      expect(localStorage.getItem('isAuthenticated')).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('should return false when not authenticated', () => {
      expect(authService.isAuthenticated()).toBe(false)
    })

    it('should return true after successful login', async () => {
      await authService.login({ email: 'admin', password: 'admin@1234' })
      expect(authService.isAuthenticated()).toBe(true)
    })

    it('should read authentication state from localStorage', () => {
      localStorage.setItem('isAuthenticated', 'true')
      expect(authService.isAuthenticated()).toBe(true)
    })

    it('should return false after logout', async () => {
      await authService.login({ email: 'admin', password: 'admin@1234' })
      authService.logout()
      expect(authService.isAuthenticated()).toBe(false)
    })
  })
})
