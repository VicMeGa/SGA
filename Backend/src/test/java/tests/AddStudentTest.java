package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pages.LoginPage;
import pages.StudentPage;

/**
 * Tests para el caso de uso: Agregar Cuenta de Alumno (CPS_6)
 */
class AddStudentTest extends BaseTest {

        private LoginPage loginPage;
        private StudentPage studentPage;

        @BeforeEach
        void loginBeforeTest() {
                // Login previo necesario para acceder a la funcionalidad
                loginPage = new LoginPage(driver);
                studentPage = new StudentPage(driver);

                // Realizar login con credenciales válidas
                loginPage.login("saul@gmail.com", "123");

                // Esperar a que el login se complete y llegue al menú principal
                waitFor(2000);

                // Navegar desde el menú principal a "Registrar Usuarios"
                studentPage.navigateToRegistrarUsuarios();

                // Esperar a que cargue el módulo de registro
                waitFor(1000);
        }

        @Test
        @DisplayName("CPS_6: Agregar alumno con todos los datos válidos")
        void testAddStudentSuccessfully() {
                // Arrange
                String nombre = "Juan";
                String apellidoPaterno = "Pérez";
                String apellidoMaterno = "García";
                String email = "juan.perez@alumno.edu.mx";
                String password = "Password123";
                String matricula = "20240012"; // 8 dígitos para alumno
                String telefono = "5551234567";
                String carrera = "Licenciatura en Ingeniería en Computación";
                String semestre = "3";
                String grupo = "A"; // Solo A, B o C según validación Yup

                // Act
                studentPage.navigateToAlumnos();
                studentPage.fillStudentForm(nombre, apellidoPaterno, apellidoMaterno,
                                email, password, matricula,
                                telefono, carrera, semestre, grupo);
                studentPage.clickGuardar();

                // Esperar a que aparezca el mensaje (éxito o error)
                waitFor(2000);

                // Debug: Imprimir información de la página
                System.out.println("URL actual: " + driver.getCurrentUrl());
                System.out.println("Título de la página: " + driver.getTitle());

                // Assert - Verificar el resultado
                boolean hasSuccess = studentPage.isSuccessMessageDisplayed();
                boolean hasError = studentPage.isErrorMessageDisplayed();

                System.out.println("¿Mensaje de éxito visible? " + hasSuccess);
                System.out.println("¿Mensaje de error visible? " + hasError);

                if (hasError) {
                        String errorMsg = studentPage.getErrorMessage();
                        System.out.println("Error detectado: " + errorMsg);
                        takeScreenshot("add_student_error");
                }

                if (hasSuccess) {
                        System.out.println("Éxito: Alumno agregado correctamente");
                        takeScreenshot("add_student_success");
                }

                Assertions.assertTrue(hasSuccess,
                                "Debería mostrarse un mensaje de éxito al agregar el alumno");
        }

        @Test
        @DisplayName("CPS_6: Validar campos obligatorios vacíos")
        void testAddStudentWithEmptyRequiredFields() {
                // Arrange - Dejar campos obligatorios vacíos
                String nombre = "";
                String apellidoPaterno = "";
                String apellidoMaterno = "";
                String email = "";
                String password = "";
                String matricula = "";
                String telefono = "";
                String carrera = "";
                String semestre = "";
                String grupo = "";

                // Act
                studentPage.navigateToAlumnos();
                studentPage.fillStudentForm(nombre, apellidoPaterno, apellidoMaterno,
                                email, password, matricula,
                                telefono, carrera, semestre, grupo);
                studentPage.clickGuardar();
                waitFor(2000);

                // Assert - Con campos vacíos, Yup mostrará errores de validación
                // El formulario no se envía, por lo que NO debe haber mensaje de éxito
                Assertions.assertFalse(studentPage.isSuccessMessageDisplayed(),
                                "No debería permitir guardar con campos obligatorios vacíos");

                // Screenshot de evidencia
                takeScreenshot("add_student_empty_fields");
        }

        @Test
        @DisplayName("CPS_6: Validar formato de email inválido")
        void testAddStudentWithInvalidEmailFormat() {
                // Arrange
                String nombre = "Pedro";
                String apellidoPaterno = "Díaz";
                String apellidoMaterno = "Torres";
                String email = "email_invalido_sin_arroba.com"; // Email sin @
                String password = "Password123";
                String matricula = "20240099"; // 8 dígitos para alumno
                String telefono = "5552222222";
                String carrera = "Licenciatura en Ingeniería en Computación";
                String semestre = "1";
                String grupo = "C"; // Solo A, B o C según validación Yup

                // Act
                studentPage.navigateToAlumnos();
                studentPage.fillStudentForm(nombre, apellidoPaterno, apellidoMaterno,
                                email, password, matricula,
                                telefono, carrera, semestre, grupo);
                studentPage.clickGuardar();
                waitFor(2000);

                // Assert - Email inválido debe ser rechazado por Yup
                Assertions.assertFalse(studentPage.isSuccessMessageDisplayed(),
                                "No debería guardar con formato de email inválido");

                // Screenshot de evidencia
                takeScreenshot("add_student_invalid_email");
        }

}
