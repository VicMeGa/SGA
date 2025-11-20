package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pages.LoginPage;

/**
 * Tests para el caso de uso: Iniciar Sesión (CPS_1)
 */
class LoginTest extends BaseTest {

    @Test
    @DisplayName("CPS_1: Login exitoso con credenciales válidas")
    void testLoginSuccessful() {
        // Arrange - Preparar
        LoginPage loginPage = new LoginPage(driver);
        String validEmail = "saul@gmail.com";
        String validPassword = "123";

        // Act - Ejecutar
        loginPage.login(validEmail, validPassword);

        // Assert - Verificar
        Assertions.assertTrue(loginPage.isLoginSuccessful(),
                "El usuario debería haber iniciado sesión exitosamente");

        // Screenshot de evidencia
        takeScreenshot("login_successful");
    }

    @Test
    @DisplayName("CPS_1: Login fallido con credenciales inválidas")
    void testLoginWithInvalidCredentials() {
        // Arrange
        LoginPage loginPage = new LoginPage(driver);
        String invalidEmail = "usuario_invalido@gmail.com";
        String invalidPassword = "password_incorrecto";

        // Act
        loginPage.login(invalidEmail, invalidPassword);

        // Assert
        Assertions.assertTrue(loginPage.isErrorMessageDisplayed(),
                "Debería mostrarse un mensaje de error");

        // Screenshot de evidencia
        takeScreenshot("login_failed");
    }

    @Test
    @DisplayName("CPS_1: Login fallido con contraseña vacía")
    void testLoginWithEmptyPassword() {
        // Arrange
        LoginPage loginPage = new LoginPage(driver);
        String validEmail = "saul@gmail.com";
        String emptyPassword = "";

        // Act
        loginPage.login(validEmail, emptyPassword);

        // Assert
        Assertions.assertFalse(loginPage.isLoginSuccessful(),
                "No debería permitir login con contraseña vacía");

        // Screenshot de evidencia
        takeScreenshot("login_empty_password");
    }

    @Test
    @DisplayName("CPS_1: Login fallido con email vacío")
    void testLoginWithEmptyEmail() {
        // Arrange
        LoginPage loginPage = new LoginPage(driver);
        String emptyEmail = "";
        String validPassword = "123";

        // Act
        loginPage.login(emptyEmail, validPassword);

        // Assert
        Assertions.assertFalse(loginPage.isLoginSuccessful(),
                "No debería permitir login con email vacío");

        // Screenshot de evidencia
        takeScreenshot("login_empty_email");
    }

}
