import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputField from '@/components/auth/InputField.vue'

describe('InputField', () => {
  it('renders properly with required props', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
      },
    })

    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('input').attributes('id')).toBe('test-input')
  })

  it('renders with placeholder', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test',
        modelValue: '',
        placeholder: 'Enter text',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
  })

  it('uses correct input type', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Password',
        modelValue: '',
        type: 'password',
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('shows password toggle button when showPasswordToggle is true', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'password',
        label: 'Password',
        modelValue: '',
        showPasswordToggle: true,
      },
    })

    expect(wrapper.find('button[aria-label="Toggle password visibility"]').exists()).toBe(true)
  })

  it('does not show password toggle button when showPasswordToggle is false', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'email',
        label: 'Email',
        modelValue: '',
        showPasswordToggle: false,
      },
    })

    expect(wrapper.find('button[aria-label="Toggle password visibility"]').exists()).toBe(false)
  })

  it('emits togglePassword event when toggle button is clicked', async () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'password',
        label: 'Password',
        modelValue: '',
        showPasswordToggle: true,
      },
    })

    const toggleButton = wrapper.find('button[aria-label="Toggle password visibility"]')
    await toggleButton.trigger('click')

    expect(wrapper.emitted('togglePassword')).toBeTruthy()
  })

  it('renders with required attribute when required is true', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test',
        modelValue: '',
        required: true,
      },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('w-full')
    expect(input.classes()).toContain('px-4')
    expect(input.classes()).toContain('rounded-lg')
  })

  it('renders slot content for icon', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test',
        label: 'Test',
        modelValue: '',
        showPasswordToggle: true,
      },
      slots: {
        icon: '<svg data-testid="custom-icon"></svg>',
      },
    })

    expect(wrapper.find('[data-testid="custom-icon"]').exists()).toBe(true)
  })
})
