import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import LoginView from '../LoginView.vue'
import { authService } from '@/services/AuthService'

// Mock the auth service
vi.mock('@/services/AuthService', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: vi.fn(),
  },
}))

describe('LoginView', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(() => {
    // Create a fresh router for each test
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
        { path: '/login', name: 'login', component: LoginView },
      ],
    })

    // Reset all mocks
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders login form correctly', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('h1').text()).toBe('Welcome Back')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('displays identifiant and password fields', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('displays demo credentials hint', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Demo credentials')
    expect(wrapper.text()).toContain('admin')
    expect(wrapper.text()).toContain('admin@1234')
  })

  it('has a submit button', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('can toggle password visibility', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const passwordToggle = wrapper.find('button[aria-label="Toggle password visibility"]')
    expect(passwordToggle.exists()).toBe(true)

    await passwordToggle.trigger('click')
    // After clicking, the password should be visible
    // The component state should change
  })

  it('calls authService.login on form submit with valid credentials', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      success: true,
      message: 'Login successful',
      user: { email: 'admin', name: 'Administrator' },
    })

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    // Find inputs
    const inputs = wrapper.findAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]

    // Fill in the form
    await emailInput.setValue('admin')
    await passwordInput.setValue('admin@1234')

    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')

    // Wait for async operations
    await wrapper.vm.$nextTick()

    expect(authService.login).toHaveBeenCalledWith({
      email: 'admin',
      password: 'admin@1234',
    })
  })

  it('shows error message on login failure', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      success: false,
      message: 'Invalid credentials. Please try again.',
    })

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('wronguser')
    await inputs[1].setValue('wrongpass')

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    // Wait a bit for the error message to appear
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.text()).toContain('Invalid credentials')
  })

  it('redirects to home page on successful login', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      success: true,
      message: 'Login successful',
      user: { email: 'admin', name: 'Administrator' },
    })

    router.push('/login')
    await router.isReady()

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('admin')
    await inputs[1].setValue('admin@1234')

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    // Wait for navigation
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(router.currentRoute.value.path).toBe('/')
  })

  it('disables submit button when form is incomplete', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('shows loading state during login', async () => {
    vi.mocked(authService.login).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                success: true,
                message: 'Login successful',
                user: { email: 'admin', name: 'Administrator' },
              }),
            100,
          ),
        ),
    )

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('admin')
    await inputs[1].setValue('admin@1234')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    // Check for loading state
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Loading')
  })
})
