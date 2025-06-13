<template>
  <v-app>
    <v-main class="login-container">
      <!-- Animated background -->
      <div class="animated-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <!-- Main login card -->
      <v-container fluid class="fill-height d-flex align-center justify-center">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4" xl="3">
            <v-card 
              class="login-card pa-8"
              elevation="0"
              :style="{ transform: `translateY(${cardOffset}px)` }"
            >
              <!-- Logo/Brand section -->
              <div class="text-center mb-8">
                <div class="brand-icon mb-4">
                  <v-icon size="48" color="primary">mdi-shield-star</v-icon>
                </div>
                <h1 class="brand-title mb-2">Welcome Back</h1>
                <p class="brand-subtitle">Sign in to your account</p>
              </div>

              <!-- Login form -->
              <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  variant="outlined"
                  class="mb-4 custom-input"
                  prepend-inner-icon="mdi-email-outline"
                  color="primary"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  variant="outlined"
                  class="mb-6 custom-input"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  color="primary"
                  required
                ></v-text-field>

                <!-- Remember me and forgot password -->
                <div class="d-flex justify-space-between align-center mb-6">
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember me"
                    color="primary"
                    density="compact"
                    hide-details
                  ></v-checkbox>
                  
                  <v-btn
                    variant="text"
                    color="primary"
                    size="small"
                    @click="handleForgotPassword"
                  >
                    Forgot password?
                  </v-btn>
                </div>

                <!-- Login button -->
                <v-btn
                  type="submit"
                  block
                  size="large"
                  color="primary"
                  variant="flat"
                  class="login-btn mb-4"
                  :loading="loading"
                  :disabled="!valid"
                >
                  Sign In
                </v-btn>

                <!-- Divider -->
                <div class="divider-container mb-4">
                  <v-divider></v-divider>
                  <span class="divider-text">or</span>
                  <v-divider></v-divider>
                </div>

                <!-- Social login buttons -->
                <div class="social-buttons mb-6">
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="social-btn"
                    @click="handleGoogleLogin"
                  >
                    <v-icon start>mdi-google</v-icon>
                    Google
                  </v-btn>
                  
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="social-btn"
                    @click="handleGithubLogin"
                  >
                    <v-icon start>mdi-github</v-icon>
                    GitHub
                  </v-btn>
                </div>

                <!-- Sign up link -->
                <div class="text-center">
                  <span class="text-body-2">Don't have an account? </span>
                  <v-btn
                    variant="text"
                    color="primary"
                    size="small"
                    @click="handleSignUp"
                  >
                    Sign up
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ArtisticLogin',
  setup() {
    const valid = ref(false)
    const loading = ref(false)
    const showPassword = ref(false)
    const rememberMe = ref(false)
    const email = ref('')
    const password = ref('')
    const cardOffset = ref(0)

    const emailRules = [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ]

    const passwordRules = [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be at least 6 characters',
    ]

    // Mouse move effect for card
    const handleMouseMove = (e) => {
      const { clientY } = e
      const { innerHeight } = window
      const mouseY = clientY / innerHeight
      cardOffset.value = (mouseY - 0.5) * 20
    }

    const handleLogin = async () => {
      loading.value = true
      // Simulate API call
      setTimeout(() => {
        loading.value = false
        console.log('Login attempted with:', { email: email.value, password: password.value })
      }, 2000)
    }

    const handleForgotPassword = () => {
      console.log('Forgot password clicked')
    }

    const handleGoogleLogin = () => {
      console.log('Google login clicked')
    }

    const handleGithubLogin = () => {
      console.log('GitHub login clicked')
    }

    const handleSignUp = () => {
      console.log('Sign up clicked')
    }

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove)
    })

    return {
      valid,
      loading,
      showPassword,
      rememberMe,
      email,
      password,
      cardOffset,
      emailRules,
      passwordRules,
      handleLogin,
      handleForgotPassword,
      handleGoogleLogin,
      handleGithubLogin,
      handleSignUp
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
  position: relative;
  overflow: hidden;
}

.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #ec4899, #f97316);
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

.login-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.login-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
}

.brand-icon {
  display: inline-block;
  padding: 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  margin-bottom: 16px;
}

.brand-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1f2937, #4b5563);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle {
  color: #6b7280;
  font-size: 1rem;
}

.custom-input :deep(.v-field) {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.custom-input :deep(.v-field:hover) {
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
}

.custom-input :deep(.v-field--focused) {
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
}

.login-btn {
  border-radius: 12px !important;
  height: 48px !important;
  font-weight: 600;
  text-transform: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.divider-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.divider-text {
  color: #9ca3af;
  font-size: 0.875rem;
  white-space: nowrap;
}

.social-buttons {
  display: flex;
  gap: 12px;
}

.social-btn {
  flex: 1;
  border-radius: 12px !important;
  height: 44px !important;
  text-transform: none;
  border: 1px solid #e5e7eb !important;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: #6366f1 !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
}
</style>