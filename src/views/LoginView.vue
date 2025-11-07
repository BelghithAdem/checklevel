<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '@/components/auth/InputField.vue'
import SubmitButton from '@/components/auth/SubmitButton.vue'
import ErrorMessage from '@/components/auth/ErrorMessage.vue'

import { authService } from '@/services/AuthService'
import type { IUser } from '@/interfaces/IAuth'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const showError = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  showError.value = false
  errorMessage.value = ''

  const credentials: IUser = {
    email: email.value,
    password: password.value,
  }

  try {
    const response = await authService.login(credentials)

    if (response.success) {
      // Redirect to home page on success
      router.push('/')
    } else {
      // Show error message
      errorMessage.value = response.message
      showError.value = true

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        showError.value = false
      }, 5000)
    }
  } catch {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    showError.value = true
  } finally {
    isLoading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <!-- Login Card -->
  <div class="w-full h-full">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
      <p class="text-slate-600">Sign in to your account to continue</p>
      <p class="text-sm text-slate-500 mt-2">
        Demo credentials:
        <span class="font-mono bg-slate-100 px-2 py-1 rounded">admin / admin@1234</span>
      </p>
    </div>

    <!-- Form Card -->
    <div
      class="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl max-w-md mx-auto"
    >
      <ErrorMessage :message="errorMessage" :show="showError" />

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email Input -->
        <InputField
          id="email"
          v-model="email"
          label="Identifiant"
          type="text"
          placeholder="example"
          :required="true"
        />

        <!-- Password Input -->
        <InputField
          id="password"
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          :required="true"
          :show-password-toggle="true"
          @toggle-password="togglePassword"
        >
        </InputField>

        <!-- Submit Button -->
        <SubmitButton label="Sign In" :loading="isLoading" :disabled="!email || !password" />
      </form>
    </div>
  </div>
</template>
