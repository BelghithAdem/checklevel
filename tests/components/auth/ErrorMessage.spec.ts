import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/auth/ErrorMessage.vue'

describe('ErrorMessage', () => {
  it('renders message when show is true', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error occurred',
        show: true,
      },
    })

    expect(wrapper.text()).toContain('Error occurred')
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('does not render when show is false', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error occurred',
        show: false,
      },
    })

    expect(wrapper.find('div.bg-red-50').exists()).toBe(false)
  })

  it('displays error icon', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error',
        show: true,
      },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies correct CSS classes for error styling', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error',
        show: true,
      },
    })

    const errorDiv = wrapper.find('div')
    expect(errorDiv.classes()).toContain('bg-red-50')
    expect(errorDiv.classes()).toContain('border-red-200')
    expect(errorDiv.classes()).toContain('text-red-800')
  })

  it('renders with rounded corners', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error',
        show: true,
      },
    })

    expect(wrapper.find('div').classes()).toContain('rounded-lg')
  })

  it('has proper spacing', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error',
        show: true,
      },
    })

    const errorDiv = wrapper.find('div')
    expect(errorDiv.classes()).toContain('mb-4')
    expect(errorDiv.classes()).toContain('p-4')
  })

  it('updates message when prop changes', async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'First error',
        show: true,
      },
    })

    expect(wrapper.text()).toContain('First error')

    await wrapper.setProps({ message: 'Second error' })
    expect(wrapper.text()).toContain('Second error')
  })

  it('toggles visibility when show prop changes', async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error',
        show: false,
      },
    })

    expect(wrapper.find('div.bg-red-50').exists()).toBe(false)

    await wrapper.setProps({ show: true })
    expect(wrapper.find('div.bg-red-50').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.find('div.bg-red-50').exists()).toBe(false)
  })
})
