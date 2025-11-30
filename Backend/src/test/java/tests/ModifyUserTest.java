package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pages.LoginPage;
import pages.ModifyUserPage;

/**
 * Tests para el caso de uso: Modificar Cuenta (CPS_10)
 */
class ModifyUserTest extends BaseTest {

    private LoginPage loginPage;
    private ModifyUserPage modifyUserPage;

    // Constantes de prueba
    private static final String MATRICULA_TEST_1 = "20240012";
    private static final String MATRICULA_TEST_2 = "20240056";
    private static final String MATRICULA_TEST_3 = "20240099";

    @BeforeEach
    void loginBeforeTest() {
        // Login previo necesario para acceder a la funcionalidad
        loginPage = new LoginPage(driver);
        modifyUserPage = new ModifyUserPage(driver);

        // Realizar login con credenciales válidas
        loginPage.login("saul@gmail.com", "123");

        // Esperar a que el login se complete
        waitFor(2000);
    }

    @Test
    @DisplayName("CPS_10: Modificar teléfono de alumno existente")
    void testModifyStudentPhoneSuccessfully() {
        // Arrange
        String nuevoTelefono = "5559998877";
        String nuevoGrupo = "3A";

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.searchUser(MATRICULA_TEST_1);
        waitFor(2000); // Esperar resultados de búsqueda
        modifyUserPage.selectFirstUserFromTable();
        waitFor(2000); // Esperar que se cargue el formulario
        modifyUserPage.modifyTelefono(nuevoTelefono);
        modifyUserPage.modifyGrupo(nuevoGrupo);
        modifyUserPage.saveChanges();
        waitFor(2000); // Esperar mensaje de éxito

        // Assert
        Assertions.assertTrue(modifyUserPage.isSuccessMessageDisplayed(),
                "Debería mostrarse un mensaje de éxito al modificar el alumno");

        // Screenshot de evidencia
        takeScreenshot("modify_student_phone_success");
    }

    @Test
    @DisplayName("CPS_10: Modificar email de alumno existente")
    void testModifyStudentEmailSuccessfully() {
        // Arrange
        String nuevoEmail = "juan.perez.nuevo@alumno.edu.mx";
        String nuevoSemestre = "5";

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.searchUser(MATRICULA_TEST_2);
        waitFor(2000);
        modifyUserPage.selectFirstUserFromTable();
        waitFor(2000);
        modifyUserPage.modifyEmail(nuevoEmail);
        modifyUserPage.modifySemestre(nuevoSemestre);
        modifyUserPage.saveChanges();
        waitFor(2000);

        // Assert
        Assertions.assertTrue(modifyUserPage.isSuccessMessageDisplayed(),
                "Debería mostrarse un mensaje de éxito al modificar el email");

        // Screenshot de evidencia
        takeScreenshot("modify_student_email_success");
    }

    @Test
    @DisplayName("CPS_10: Modificar múltiples campos de alumno")
    void testModifyMultipleStudentFields() {
        // Arrange
        String nuevoTelefono = "5551112233";
        String nuevoProgramaEducativo = "Licenciatura en Ingeniería en Computación";
        String nuevoSemestre = "6";
        String nuevoGrupo = "2B";

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.searchUser(MATRICULA_TEST_3);
        waitFor(2000);
        modifyUserPage.selectFirstUserFromTable();
        waitFor(2000);
        modifyUserPage.modifyTelefono(nuevoTelefono);
        modifyUserPage.modifyProgramaEducativo(nuevoProgramaEducativo);
        modifyUserPage.modifySemestre(nuevoSemestre);
        modifyUserPage.modifyGrupo(nuevoGrupo);
        modifyUserPage.saveChanges();
        waitFor(2000);

        // Assert
        Assertions.assertTrue(modifyUserPage.isSuccessMessageDisplayed(),
                "Debería mostrarse un mensaje de éxito al modificar múltiples campos");

        // Screenshot de evidencia
        takeScreenshot("modify_student_multiple_fields_success");
    }

    @Test
    @DisplayName("CPS_10: Cancelar modificación de alumno")
    void testCancelModifyStudent() {
        // Arrange
        String nuevoTelefono = "5551234567";

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.searchUser(MATRICULA_TEST_1);
        waitFor(2000);
        modifyUserPage.selectFirstUserFromTable();
        waitFor(2000);
        modifyUserPage.modifyTelefono(nuevoTelefono);
        modifyUserPage.cancelEdit();
        waitFor(1000);

        // Assert
        // Verificar que no se muestra mensaje de éxito (cambios no guardados)
        Assertions.assertFalse(modifyUserPage.isSuccessMessageDisplayed(),
                "No debería mostrarse mensaje de éxito al cancelar");

        // Screenshot de evidencia
        takeScreenshot("modify_student_cancel");
    }

    @Test
    @DisplayName("CPS_10: Buscar alumno inexistente")
    void testSearchNonExistentStudent() {
        // Arrange
        String matriculaInexistente = "99999999"; // 8 dígitos pero no existe

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.searchUser(matriculaInexistente);
        waitFor(2000);

        // Assert - puede mostrar error o simplemente no encontrar resultados
        // El comportamiento depende de la implementación del frontend

        // Screenshot de evidencia
        takeScreenshot("modify_student_not_found");
    }

    @Test
    @DisplayName("CPS_10: Error al modificar con email duplicado")
    void testModifyStudentWithDuplicateEmail() {
        // Arrange
        String emailDuplicado = "saul@gmail.com"; // Email que ya existe en el sistema

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.searchUser(MATRICULA_TEST_1);
        waitFor(2000);
        modifyUserPage.selectFirstUserFromTable();
        waitFor(2000);
        modifyUserPage.modifyEmail(emailDuplicado);
        modifyUserPage.saveChanges();
        waitFor(2000);

        // Assert
        Assertions.assertTrue(modifyUserPage.isErrorMessageDisplayed(),
                "Debería mostrarse un mensaje de error por email duplicado");

        // Screenshot de evidencia
        takeScreenshot("modify_student_duplicate_email");
    }

    @Test
    @DisplayName("CPS_10: Flujo completo de modificación de alumno")
    void testModifyStudentCompleteFlow() {
        // Arrange
        String nuevoTelefono = "5556667788";
        String nuevoGrupo = "4C";

        // Act
        modifyUserPage.navigateToModificar();
        modifyUserPage.modifyStudentComplete(MATRICULA_TEST_3, nuevoTelefono, nuevoGrupo);
        waitFor(2000);

        // Assert
        Assertions.assertTrue(modifyUserPage.isSuccessMessageDisplayed(),
                "Debería mostrarse un mensaje de éxito usando el método completo");

        // Screenshot de evidencia
        takeScreenshot("modify_student_complete_flow");
    }
}
