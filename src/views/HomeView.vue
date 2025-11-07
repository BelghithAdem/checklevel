<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/AuthService'

const router = useRouter()
const user = ref<{ email: string; name: string } | null>(null)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

const handleLogout = () => {
  authService.logout()
  router.push('/login')
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold text-slate-900 mb-2">Welcome, {{ user?.name }}!</h1>
          <p class="text-slate-600">You have successfully logged in to your account.</p>
        </div>
        <button
          @click="handleLogout"
          class="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
