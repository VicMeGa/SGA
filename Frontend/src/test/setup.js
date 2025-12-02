// src/test/setup.js
import '@testing-library/jest-dom'

// Mock para manejar imports de imágenes
vi.mock('../recursos/user.png', () => ({
  default: 'mocked-user-icon.png'
}))

// Mock global para import.meta.env si necesitas valores específicos
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_BACKEND_URL: 'http://localhost:3000'
      }
    }
  }
})