// src/Contenedores/Login.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

// Mocks - IMPORTANTE: deben estar al inicio, antes de los imports del componente
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  BrowserRouter: ({ children }) => children
}))

vi.mock('../hook/useSession', () => ({
  default: vi.fn()
}))

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn()
  }
}))

vi.mock('../recursos/user.png', () => ({
  default: 'mocked-user-icon.png'
}))

// Mock de fetch global
global.fetch = vi.fn()

// Mock de variables de entorno
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_BACKEND_URL: 'http://localhost:3000'
  },
  writable: true
})

// Importar los mocks después de definirlos
import { useNavigate } from 'react-router-dom'
import useSession from '../hook/useSession'
import { toast } from 'react-toastify'

// Wrapper para React Router
const LoginWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Login Component', () => {
  const mockNavigate = vi.fn()
  const mockSaveSession = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Configurar los valores de retorno de los mocks
    useNavigate.mockReturnValue(mockNavigate)
    useSession.mockReturnValue({ saveSession: mockSaveSession })
  })

  it('renderiza correctamente todos los elementos', () => {
    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )

    expect(screen.getByPlaceholderText('Correo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument()
    expect(screen.getByAltText('User Icon')).toBeInTheDocument()
  })

  it('actualiza el estado cuando el usuario escribe en los inputs', () => {
    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )

    const emailInput = screen.getByPlaceholderText('Correo')
    const passwordInput = screen.getByPlaceholderText('Contraseña')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('maneja el login exitoso correctamente', async () => {
    const mockResponse = {
      exito: true,
      mensaje: 'Login exitoso',
      numeroEmpleado: '12345'
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )

    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'password123' }
    })

    // Enviar formulario
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    // Verificar que se hizo la petición correcta
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/login'), 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            correo: 'test@example.com',
            contrasena: 'password123'
          })
        }
      )
    })

    // Verificar las acciones después del login exitoso
    await waitFor(() => {
      expect(mockSaveSession).toHaveBeenCalledWith('12345')
      expect(toast.success).toHaveBeenCalledWith('✅ Login exitoso')
      expect(mockNavigate).toHaveBeenCalledWith('/next')
    })
  })

  it('maneja el login fallido correctamente', async () => {
    const mockResponse = {
      exito: false,
      mensaje: 'Credenciales incorrectas'
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'wrongpassword' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('❌ Credenciales incorrectas')
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  it('maneja errores de conexión', async () => {
    const errorMessage = 'Network error'
    global.fetch.mockRejectedValueOnce(new Error(errorMessage))

    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        `⚠️ Error en la conexión con el servidor: ${errorMessage}`
      )
    })
  })

  it('llama a saveSession correctamente en login exitoso', async () => {
    const mockResponse = {
      exito: true,
      mensaje: 'Login exitoso',
      numeroEmpleado: '12345'
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    await waitFor(() => {
      // Ahora espera solo 1 llamada (código corregido)
      expect(mockSaveSession).toHaveBeenCalledTimes(1)
      expect(mockSaveSession).toHaveBeenCalledWith('12345')
    })
  })
})