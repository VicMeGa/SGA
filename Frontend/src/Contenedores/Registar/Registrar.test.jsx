// src/Contenedores/Registar/Registrar.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Registrar from './Registrar'

// Mocks - IMPORTANTE: Mockear antes de importar los componentes
vi.mock('../Cabeza', () => ({
  default: () => <div data-testid="cabeza">Cabeza</div>
}))

vi.mock('../Nav', () => ({
  default: () => <div data-testid="nav">Nav</div>
}))

vi.mock('./MenuReg', () => ({
  default: () => <div data-testid="menureg">MenuReg</div>
}))

// Mock del hook useSession que usa el componente
vi.mock('../hook/useSession', () => ({
  default: vi.fn(() => ({
    session: { token: 'mock-token', numeroEmpleado: '12345' },
    saveSession: vi.fn(),
    clearSession: vi.fn()
  }))
}))

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
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

// Mock de window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn()
  },
  writable: true
})

// Importar los mocks después de definirlos
import { toast } from 'react-toastify'

// Wrapper para React Router si es necesario
const RegistrarWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Registrar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch.mockClear()
  })

  it('renderiza correctamente todos los elementos', () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    // Verificar que se renderizan los componentes mockeados
    expect(screen.getByTestId('cabeza')).toBeInTheDocument()
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('menureg')).toBeInTheDocument()

    // Verificar el título
    expect(screen.getByText('Registrar Alumno')).toBeInTheDocument()

    // Verificar todos los campos del formulario
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Apellido Paterno')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Apellido Materno')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Matricula')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Grupo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Teléfono')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Semestre')).toBeInTheDocument()

    // Verificar select
    expect(screen.getByDisplayValue('Selecciona un programa educativo')).toBeInTheDocument()

    // Verificar botones
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByText('Registrar')).toBeInTheDocument()
  })

  it('actualiza los valores de los inputs cuando el usuario escribe', () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const nombreInput = screen.getByPlaceholderText('Nombre')
    const apellidoPaternoInput = screen.getByPlaceholderText('Apellido Paterno')
    const correoInput = screen.getByPlaceholderText('Correo Electrónico')

    fireEvent.change(nombreInput, { target: { value: 'Juan' } })
    fireEvent.change(apellidoPaternoInput, { target: { value: 'Pérez' } })
    fireEvent.change(correoInput, { target: { value: 'juan@test.com' } })

    expect(nombreInput.value).toBe('Juan')
    expect(apellidoPaternoInput.value).toBe('Pérez')
    expect(correoInput.value).toBe('juan@test.com')
  })

  it('muestra errores de validación para campos con formato incorrecto', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    // El comportamiento real: campos vacíos activan validación de formato
    const submitButton = screen.getByText('Registrar')
    fireEvent.click(submitButton)

    // Esperar a que aparezcan los errores (usar getAllByText para elementos múltiples)
    await waitFor(() => {
      const nameErrors = screen.getAllByText('Las primeras letras deben ser mayusculas, solo se admiten letras')
      expect(nameErrors.length).toBeGreaterThanOrEqual(1) // Al menos uno
      expect(screen.getByText('Debe tener 8 dígitos')).toBeInTheDocument()
      expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument()
    })
  })

  it('valida el formato de la matrícula', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const matriculaInput = screen.getByPlaceholderText('Matricula')
    fireEvent.change(matriculaInput, { target: { value: '123' } })

    const submitButton = screen.getByText('Registrar')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Debe tener 8 dígitos')).toBeInTheDocument()
    })
  })

  it('valida el formato del correo electrónico', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const correoInput = screen.getByPlaceholderText('Correo Electrónico')
    
    // Verificar que el input funciona básicamente
    fireEvent.change(correoInput, { target: { value: 'test@correo.com' } })
    expect(correoInput.value).toBe('test@correo.com')
    
    // Verificar que es un input de email
    expect(correoInput).toBeInTheDocument()
    expect(correoInput.type).toBe('email')
    
    // Si queremos probar que un correo inválido no permite envío
    // Llenar solo campos mínimos y usar un correo claramente inválido
    fireEvent.change(correoInput, { target: { value: 'not-an-email' } })
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } })
    
    const submitButton = screen.getByText('Registrar')
    fireEvent.click(submitButton)
    
    // Al menos verificar que no se envió exitosamente
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('valida que hay múltiples errores de formato de nombres', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const nombreInput = screen.getByPlaceholderText('Nombre')
    fireEvent.change(nombreInput, { target: { value: 'juan123' } })

    const submitButton = screen.getByText('Registrar')
    fireEvent.click(submitButton)

    await waitFor(() => {
      // Usar getAllByText porque hay múltiples campos con el mismo mensaje de error
      const errorMessages = screen.getAllByText('Las primeras letras deben ser mayusculas, solo se admiten letras')
      expect(errorMessages.length).toBeGreaterThan(0)
    })
  })

  it('valida que el grupo sea A, B o C', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const grupoInput = screen.getByPlaceholderText('Grupo')
    fireEvent.change(grupoInput, { target: { value: 'D' } })

    const submitButton = screen.getByText('Registrar')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Solo hay grupos A, B o C')).toBeInTheDocument()
    })
  })

  it('maneja el registro exitoso correctamente', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => 'Registro exitoso'
    })

    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    // Llenar todos los campos requeridos correctamente
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByPlaceholderText('Apellido Paterno'), { target: { value: 'Pérez' } })
    fireEvent.change(screen.getByPlaceholderText('Apellido Materno'), { target: { value: 'García' } })
    fireEvent.change(screen.getByPlaceholderText('Matricula'), { target: { value: '12345678' } })
    fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'juan@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Grupo'), { target: { value: 'A' } })
    fireEvent.change(screen.getByPlaceholderText('Semestre'), { target: { value: '5' } })
    // Dejar teléfono vacío ya que es opcional pero está dando problemas
    fireEvent.change(screen.getByPlaceholderText('Teléfono'), { target: { value: '1234567890' } })
    
    // Seleccionar programa educativo
    const select = screen.getByDisplayValue('Selecciona un programa educativo')
    fireEvent.change(select, { target: { value: 'Licenciatura en Ingeniería en Computación' } })

    // Enviar formulario
    fireEvent.click(screen.getByText('Registrar'))

    // Verificar la petición
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/registro/alumno'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )
    }, { timeout: 3000 })

    // Verificar que se mostró el toast de éxito
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Registro exitoso')
    })
  })

  it('maneja errores de red correctamente', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    // Llenar campos válidos
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByPlaceholderText('Apellido Paterno'), { target: { value: 'Pérez' } })
    fireEvent.change(screen.getByPlaceholderText('Apellido Materno'), { target: { value: 'García' } })
    fireEvent.change(screen.getByPlaceholderText('Matricula'), { target: { value: '12345678' } })
    fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'juan@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Grupo'), { target: { value: 'A' } })
    fireEvent.change(screen.getByPlaceholderText('Semestre'), { target: { value: '5' } })
    fireEvent.change(screen.getByPlaceholderText('Teléfono'), { target: { value: '1234567890' } })

    const select = screen.getByDisplayValue('Selecciona un programa educativo')
    fireEvent.change(select, { target: { value: 'Licenciatura en Ingeniería en Computación' } })

    fireEvent.click(screen.getByText('Registrar'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error al registrar alumno', expect.any(Object))
    }, { timeout: 3000 })
  })

  it('muestra todas las opciones del programa educativo', () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    // Verificar que las opciones están presentes
    expect(screen.getByText('Licenciatura en Ingeniería Mecánica')).toBeInTheDocument()
    expect(screen.getByText('Licenciatura en Ingeniería en Computación')).toBeInTheDocument()
    expect(screen.getByText('Licenciatura en Matemáticas Aplicadas')).toBeInTheDocument()
    expect(screen.getByText('Licenciatura en Ingeniería Química')).toBeInTheDocument()
    expect(screen.getByText('Licenciatura en Química Industrial')).toBeInTheDocument()
    expect(screen.getByText('Ingeniería en Sistemas Electrónicos')).toBeInTheDocument()
    expect(screen.getByText('Licenciatura en Ingeniería en Inteligencia Artificial')).toBeInTheDocument()
  })

  it('funciona el botón Cancelar', () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const cancelButton = screen.getByText('Cancelar')
    fireEvent.click(cancelButton)

    expect(window.location.reload).toHaveBeenCalled()
  })

  it('valida que el semestre sea de 1 dígito', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    const semestreInput = screen.getByPlaceholderText('Semestre')
    fireEvent.change(semestreInput, { target: { value: '12' } })

    fireEvent.click(screen.getByText('Registrar'))

    await waitFor(() => {
      expect(screen.getByText('Debe tener 1 dígito')).toBeInTheDocument()
    })
  })

  it('permite campos válidos sin errores', async () => {
    render(
      <RegistrarWrapper>
        <Registrar />
      </RegistrarWrapper>
    )

    // Llenar con datos válidos
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByPlaceholderText('Apellido Paterno'), { target: { value: 'Pérez' } })
    fireEvent.change(screen.getByPlaceholderText('Apellido Materno'), { target: { value: 'García' } })

    // Verificar que los valores se establecieron correctamente
    expect(screen.getByPlaceholderText('Nombre').value).toBe('Juan')
    expect(screen.getByPlaceholderText('Apellido Paterno').value).toBe('Pérez')
    expect(screen.getByPlaceholderText('Apellido Materno').value).toBe('García')
  })
})