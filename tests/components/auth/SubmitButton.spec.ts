import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubmitButton from '@/components/auth/SubmitButton.vue'

describe('SubmitButton', () => {
  it('renders with label text', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Sign In',
      },
    })

    expect(wrapper.text()).toContain('Sign In')
  })

  it('has submit type', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
      },
    })

    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
        disabled: true,
      },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('is not disabled when disabled prop is false', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
        disabled: false,
      },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
        loading: true,
      },
    })

    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
  })

  it('shows label when not loading', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
        loading: false,
      },
    })

    expect(wrapper.text()).toBe('Submit')
    expect(wrapper.find('svg.animate-spin').exists()).toBe(false)
  })

  it('is disabled when loading is true', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
        loading: true,
      },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('w-full')
    expect(button.classes()).toContain('bg-slate-900')
    expect(button.classes()).toContain('text-white')
    expect(button.classes()).toContain('rounded-lg')
  })

  it('has disabled styles when disabled or loading', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
        disabled: true,
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('disabled:opacity-50')
    expect(button.classes()).toContain('disabled:cursor-not-allowed')
  })

  it('renders button element', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        label: 'Submit',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })
})
