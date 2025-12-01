package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object para la página de Modificar Usuario
 */
public class ModifyUserPage extends BasePage {

    // Localizadores de elementos
    private By menuPrincipal = By.id("menu-modificar-usuarios");

    // Búsqueda de usuario
    private By inputBuscarUsuario = By.id("buscar-usuario");
    private By btnBuscar = By.id("btn-buscar");

    // Formulario de edición
    private By inputNombre = By.id("nombre");
    private By inputApellidoPaterno = By.id("apellido-paterno");
    private By inputApellidoMaterno = By.id("apellido-materno");
    private By inputEmail = By.id("correo");
    private By inputTelefono = By.id("telefono");
    private By selectProgramaEducativo = By.id("programa-educativo");

    // Campos específicos para alumno
    private By inputMatricula = By.id("matricula");
    private By inputSemestre = By.id("semestre");
    private By inputGrupo = By.id("grupo");

    // Campos específicos para administrativo
    private By inputNumeroEmpleado = By.id("numero-empleado");
    private By inputCargo = By.id("cargo");
    private By inputContrasena = By.id("contrasena");

    // Botones
    private By btnModificar = By.id("btn-modificar");
    private By btnCancelar = By.id("btn-cancelar");
    private By btnEliminar = By.id("btn-eliminar");

    // Mensajes
    private By successMessage = By.cssSelector(".Toastify__toast--success");
    private By errorMessage = By.cssSelector(".Toastify__toast--error");

    public ModifyUserPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navega al menú de Modificar Usuario desde el menú principal
     */
    public void navigateToModificar() {
        click(menuPrincipal);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
        }
    }

    /**
     * Busca un usuario por criterio (nombre, matrícula, email, etc.)
     */
    public void searchUser(String searchCriteria) {
        type(inputBuscarUsuario, searchCriteria);
        click(btnBuscar);
    }

    /**
     * Selecciona el primer usuario en la tabla de resultados
     */
    public void selectFirstUserFromTable() {
        // El click en la fila de la tabla se maneja automáticamente por el onClick en
        // divDerecho.jsx
        By firstUserRow = By.cssSelector(".tabla tbody tr:first-child");
        click(firstUserRow);
    }

    /**
     * Modifica el nombre del usuario
     */
    public void modifyNombre(String nuevoNombre) {
        type(inputNombre, nuevoNombre);
    }

    /**
     * Modifica el apellido paterno
     */
    public void modifyApellidoPaterno(String nuevoApellido) {
        type(inputApellidoPaterno, nuevoApellido);
    }

    /**
     * Modifica el apellido materno
     */
    public void modifyApellidoMaterno(String nuevoApellido) {
        type(inputApellidoMaterno, nuevoApellido);
    }

    /**
     * Modifica el email
     */
    public void modifyEmail(String nuevoEmail) {
        type(inputEmail, nuevoEmail);
    }

    /**
     * Modifica el teléfono
     */
    public void modifyTelefono(String nuevoTelefono) {
        type(inputTelefono, nuevoTelefono);
    }

    /**
     * Modifica el programa educativo
     */
    public void modifyProgramaEducativo(String programaEducativo) {
        selectByVisibleText(selectProgramaEducativo, programaEducativo);
    }

    /**
     * Modifica el semestre (solo para alumnos)
     */
    public void modifySemestre(String nuevoSemestre) {
        type(inputSemestre, nuevoSemestre);
    }

    /**
     * Modifica el grupo (solo para alumnos)
     */
    public void modifyGrupo(String nuevoGrupo) {
        type(inputGrupo, nuevoGrupo);
    }

    /**
     * Modifica el cargo (solo para administrativos)
     */
    public void modifyCargo(String nuevoCargo) {
        type(inputCargo, nuevoCargo);
    }

    /**
     * Modifica la contraseña (solo para administrativos)
     */
    public void modifyContrasena(String nuevaContrasena) {
        type(inputContrasena, nuevaContrasena);
    }

    /**
     * Guarda los cambios realizados
     */
    public void saveChanges() {
        click(btnModificar);
    }

    /**
     * Cancela la edición
     */
    public void cancelEdit() {
        click(btnCancelar);
    }

    /**
     * Elimina el usuario
     */
    public void deleteUser() {
        click(btnEliminar);
    }

    /**
     * Verifica si el mensaje de éxito está visible
     */
    public boolean isSuccessMessageDisplayed() {
        return isElementVisible(successMessage);
    }

    /**
     * Verifica si el mensaje de error está visible
     */
    public boolean isErrorMessageDisplayed() {
        return isElementVisible(errorMessage);
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
     * Obtiene el valor de la matrícula (campo de solo lectura)
     */
    public String getMatricula() {
        return waitForElement(inputMatricula).getAttribute("value");
    }

    /**
     * Obtiene el valor del número de empleado (campo de solo lectura)
     */
    public String getNumeroEmpleado() {
        return waitForElement(inputNumeroEmpleado).getAttribute("value");
    }

    /**
     * Flujo completo: buscar usuario alumno y modificar datos
     */
    public void modifyStudentComplete(String matricula, String nuevoTelefono, String nuevoGrupo) {
        searchUser(matricula);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            // Esperar a que se cargue la información del usuario
        }
        selectFirstUserFromTable();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            // Esperar a que se llene el formulario
        }

        modifyTelefono(nuevoTelefono);
        modifyGrupo(nuevoGrupo);

        saveChanges();
    }

    /**
     * Flujo completo: buscar usuario administrativo y modificar datos
     */
    public void modifyAdminComplete(String numeroEmpleado, String nuevoTelefono, String nuevoCargo) {
        searchUser(numeroEmpleado);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            // Esperar resultados
        }
        selectFirstUserFromTable();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            // Esperar que cargue formulario
        }

        modifyTelefono(nuevoTelefono);
        modifyCargo(nuevoCargo);

        saveChanges();
    }
}
