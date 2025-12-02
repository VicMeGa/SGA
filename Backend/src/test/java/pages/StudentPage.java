package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object para la página de gestión de Alumnos
 */
public class StudentPage extends BasePage {

    // Localizadores de elementos
    private By menuRegistrarUsuarios = By.id("menu-registrar-usuarios"); // Men\u00fa principal
    private By menuAlumnos = By.id("menu-alumno"); // Link en MenuReg.jsx
    // Nota: No hay bot\u00f3n "Agregar Alumno" separado, se navega directamente al
    // formulario

    // Formulario de registro de alumno
    private By inputNombre = By.id("nombre");
    private By inputApellidoPaterno = By.id("apellido-paterno");
    private By inputApellidoMaterno = By.id("apellido-materno");
    private By inputEmail = By.id("email");
    // Nota: No hay campo de password en el formulario de registro de alumno
    private By inputMatricula = By.id("matricula");
    private By inputTelefono = By.id("telefono");
    private By inputGrupo = By.id("grupo");
    private By selectCarrera = By.id("carrera");
    private By inputSemestre = By.id("semestre");
    private By btnGuardar = By.id("btn-guardar");
    private By btnCancelar = By.id("btn-cancelar");

    // Mensajes y validaciones (usa Toastify)
    private By successMessage = By.cssSelector(".Toastify__toast--success");
    private By errorMessage = By.cssSelector(".Toastify__toast--error, .error"); // .error es para validaciones de
                                                                                 // campos
    private By studentTable = By.cssSelector(".tabla, table"); // Tabla genérica

    public StudentPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navega desde el menú principal al módulo de Registrar Usuarios
     */
    public void navigateToRegistrarUsuarios() {
        click(menuRegistrarUsuarios);
        // Esperar a que la URL cambie a /Registrar
        wait.until(driver -> driver.getCurrentUrl().contains("/Registrar")
                || driver.getCurrentUrl().contains("#/Registrar"));
    }

    /**
     * Navega al formulario de registro de alumnos desde el menú lateral
     * (Ya estando en el módulo de Registrar Usuarios)
     * Nota: El formulario de alumno aparece por defecto al entrar a /Registrar
     */
    public void navigateToAlumnos() {
        // El formulario de alumno ya está visible al entrar a /Registrar
        // Este método se mantiene por compatibilidad
        waitFor(500);
    }

    /**
     * Llena el formulario completo de registro de alumno
     * Nota: No hay campo de password en el formulario de alumno
     */
    public void fillStudentForm(String nombre, String apellidoPaterno, String apellidoMaterno,
            String email, String password, String matricula,
            String telefono, String carrera, String semestre, String grupo) {
        type(inputNombre, nombre);
        type(inputApellidoPaterno, apellidoPaterno);
        type(inputApellidoMaterno, apellidoMaterno);
        type(inputEmail, email);
        // password no se usa en el formulario de alumno
        type(inputMatricula, matricula);
        type(inputTelefono, telefono);

        // El grupo puede ser A, B, C, etc.
        type(inputGrupo, grupo);

        // El semestre es un input de texto, no un select
        type(inputSemestre, semestre);

        // Carrera es un select - seleccionar por texto visible solo si no está vacío
        if (carrera != null && !carrera.isEmpty()) {
            selectByVisibleText(selectCarrera, carrera);
        }
    }

    /**
     * Ingresa el nombre del alumno
     */
    public void enterNombre(String nombre) {
        type(inputNombre, nombre);
    }

    /**
     * Ingresa el apellido paterno
     */
    public void enterApellidoPaterno(String apellidoPaterno) {
        type(inputApellidoPaterno, apellidoPaterno);
    }

    /**
     * Ingresa el apellido materno
     */
    public void enterApellidoMaterno(String apellidoMaterno) {
        type(inputApellidoMaterno, apellidoMaterno);
    }

    /**
     * Ingresa el email del alumno
     */
    public void enterEmail(String email) {
        type(inputEmail, email);
    }

    /**
     * Ingresa la matrícula
     */
    public void enterMatricula(String matricula) {
        type(inputMatricula, matricula);
    }

    /**
     * Ingresa el teléfono
     */
    public void enterTelefono(String telefono) {
        type(inputTelefono, telefono);
    }

    /**
     * Selecciona la carrera
     */
    public void selectCarrera(String carrera) {
        type(selectCarrera, carrera);
    }

    /**
     * Ingresa el semestre (es un input de texto, no un select)
     */
    public void selectSemestre(String semestre) {
        type(inputSemestre, semestre);
    }

    /**
     * Hace clic en el botón Guardar
     */
    public void clickGuardar() {
        click(btnGuardar);
    }

    /**
     * Hace clic en el botón Cancelar
     */
    public void clickCancelar() {
        click(btnCancelar);
    }

    /**
     * Verifica si el mensaje de éxito está visible
     * Usa timeout de 5 segundos para mensajes toast que pueden tardar en aparecer
     */
    public boolean isSuccessMessageDisplayed() {
        // Intentar múltiples selectores para el mensaje de éxito
        boolean visible = isElementVisible(successMessage, 5);
        if (!visible) {
            // Intentar con selector alternativo
            By alternativeSuccess = By.cssSelector(".Toastify__toast-container [role='alert']");
            visible = isElementVisible(alternativeSuccess, 3);
        }
        return visible;
    }

    /**
     * Verifica si el mensaje de error está visible
     * Usa timeout de 55 segundos para mensajes toast que pueden tardar en aparecer
     */
    public boolean isErrorMessageDisplayed() {
        boolean visible = isElementVisible(errorMessage, 5);
        if (!visible) {
            // Intentar con selector alternativo
            By alternativeError = By.cssSelector(".Toastify__toast-container [role='alert']");
            visible = isElementVisible(alternativeError, 3);
        }
        return visible;
    }

    /**
     * Obtiene el texto del mensaje de éxito
     */
    public String getSuccessMessage() {
        return getText(successMessage);
    }

    /**
     * Obtiene el texto del mensaje de error
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }

    /**
     * Verifica si la tabla de alumnos está visible
     */
    public boolean isStudentTableDisplayed() {
        return isElementVisible(studentTable);
    }

    /**
     * Espera un tiempo determinado (usar solo cuando sea necesario)
     * 
     * @param milliseconds Tiempo en milisegundos
     */
    private void waitFor(long milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
