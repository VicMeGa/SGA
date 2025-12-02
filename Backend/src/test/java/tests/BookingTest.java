package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pages.LoginPage;
import pages.BookingPage;

/**
 * Tests para el caso de uso: Apartar Sala (CPS_46)
 */
class BookingTest extends BaseTest {

    private LoginPage loginPage;
    private BookingPage bookingPage;

    @BeforeEach
    void loginBeforeTest() {
        // Login previo necesario para acceder a la funcionalidad
        loginPage = new LoginPage(driver);
        bookingPage = new BookingPage(driver);

        // Realizar login con credenciales válidas
        loginPage.login("saul@gmail.com", "123");

        // Esperar a que el login se complete
        waitFor(1000); // TODO: Reemplazar con espera explícita adecuada
    }

    @Test
    @DisplayName("CPS_46: Apartar sala exitosamente con datos válidos")
    void testBookingRoomSuccessfully() {
        // Arrange
        String sala = "Sala A";
        String fecha = "2024-12-25";
        String horaInicio = "10:00";
        String horaFin = "12:00";
        String motivo = "Reunión de proyecto";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.createBooking(sala, fecha, horaInicio, horaFin, motivo);

        // Assert
        Assertions.assertTrue(bookingPage.isSuccessMessageDisplayed() ||
                bookingPage.isConfirmationModalDisplayed(),
                "Debería mostrarse confirmación de reserva exitosa");

        // Screenshot de evidencia
        takeScreenshot("booking_room_success");
    }

    @Test
    @DisplayName("CPS_46: Apartar sala con recursos adicionales")
    void testBookingRoomWithResources() {
        // Arrange
        String sala = "Sala B";
        String fecha = "2024-12-26";
        String horaInicio = "14:00";
        String horaFin = "16:00";
        String motivo = "Presentación de proyecto";
        boolean proyector = true;
        boolean microfonos = true;
        boolean pizarron = false;

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.createBookingWithResources(sala, fecha, horaInicio, horaFin,
                motivo, proyector, microfonos, pizarron);

        // Assert
        Assertions.assertTrue(bookingPage.isSuccessMessageDisplayed() ||
                bookingPage.isConfirmationModalDisplayed(),
                "Debería confirmarse la reserva con recursos adicionales");

        // Screenshot de evidencia
        takeScreenshot("booking_room_with_resources");
    }

    @Test
    @DisplayName("CPS_46: Verificar disponibilidad de sala antes de apartar")
    void testCheckRoomAvailability() {
        // Arrange
        String sala = "Sala C";
        String fecha = "2024-12-27";
        String horaInicio = "09:00";
        String horaFin = "11:00";
        String motivo = "Clase especial";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.selectSala(sala);
        bookingPage.selectFecha(fecha);
        bookingPage.selectHoraInicio(horaInicio);
        bookingPage.selectHoraFin(horaFin);
        bookingPage.enterMotivo(motivo);
        bookingPage.clickVerificarDisponibilidad();

        // Assert
        Assertions.assertTrue(bookingPage.isSalaDisponible(),
                "La sala debería estar disponible para la fecha y hora seleccionadas");

        // Screenshot de evidencia
        takeScreenshot("check_room_availability");
    }

    @Test
    @DisplayName("CPS_46: Error al apartar sala en horario ocupado")
    void testBookingRoomAlreadyOccupied() {
        // Arrange - Usar horario que ya está ocupado
        String sala = "Sala A";
        String fecha = "2024-12-25"; // Misma fecha de reserva anterior
        String horaInicio = "10:00"; // Mismo horario
        String horaFin = "12:00";
        String motivo = "Segunda reunión";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.createBooking(sala, fecha, horaInicio, horaFin, motivo);

        // Assert
        Assertions.assertTrue(bookingPage.isErrorMessageDisplayed() ||
                !bookingPage.isSalaDisponible(),
                "Debería mostrar error por sala no disponible en ese horario");

        // Screenshot de evidencia
        takeScreenshot("booking_room_occupied");
    }

    @Test
    @DisplayName("CPS_46: Cancelar proceso de reserva")
    void testCancelBooking() {
        // Arrange
        String sala = "Sala D";
        String fecha = "2024-12-28";
        String horaInicio = "15:00";
        String horaFin = "17:00";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.selectSala(sala);
        bookingPage.selectFecha(fecha);
        bookingPage.selectHoraInicio(horaInicio);
        bookingPage.selectHoraFin(horaFin);
        bookingPage.clickCancelar();

        // Assert - Verificar que regresó a la lista de reservaciones
        Assertions.assertFalse(bookingPage.isConfirmationModalDisplayed(),
                "No debería mostrarse confirmación al cancelar");

        // Screenshot de evidencia
        takeScreenshot("cancel_booking");
    }

    @Test
    @DisplayName("CPS_46: Validar campos obligatorios vacíos")
    void testBookingWithEmptyFields() {
        // Arrange - Intentar reservar sin llenar campos obligatorios
        String sala = "";
        String fecha = "";
        String horaInicio = "";
        String horaFin = "";
        String motivo = "";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.createBooking(sala, fecha, horaInicio, horaFin, motivo);

        // Assert
        Assertions.assertTrue(bookingPage.isErrorMessageDisplayed() ||
                !bookingPage.isSuccessMessageDisplayed(),
                "No debería permitir reservar sin datos obligatorios");

        // Screenshot de evidencia
        takeScreenshot("booking_empty_fields");
    }

    @Test
    @DisplayName("CPS_46: Error al seleccionar hora de fin antes de hora de inicio")
    void testBookingWithInvalidTimeRange() {
        // Arrange
        String sala = "Sala E";
        String fecha = "2024-12-29";
        String horaInicio = "16:00"; // Hora de inicio después de hora de fin
        String horaFin = "14:00";
        String motivo = "Prueba horario inválido";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.createBooking(sala, fecha, horaInicio, horaFin, motivo);

        // Assert
        Assertions.assertTrue(bookingPage.isErrorMessageDisplayed() ||
                !bookingPage.isSuccessMessageDisplayed(),
                "Debería mostrar error por rango de horas inválido");

        // Screenshot de evidencia
        takeScreenshot("booking_invalid_time_range");
    }

    @Test
    @DisplayName("CPS_46: Reserva con descripción adicional y número de personas")
    void testBookingWithAdditionalDetails() {
        // Arrange
        String sala = "Sala F";
        String fecha = "2024-12-30";
        String horaInicio = "13:00";
        String horaFin = "15:00";
        String motivo = "Workshop de tecnología";
        String descripcion = "Taller de introducción a DevOps para estudiantes";
        String numeroPersonas = "25";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.selectSala(sala);
        bookingPage.selectFecha(fecha);
        bookingPage.selectHoraInicio(horaInicio);
        bookingPage.selectHoraFin(horaFin);
        bookingPage.enterMotivo(motivo);
        bookingPage.enterDescripcion(descripcion);
        bookingPage.enterNumeroPersonas(numeroPersonas);
        bookingPage.clickVerificarDisponibilidad();
        bookingPage.clickConfirmarReserva();

        // Assert
        Assertions.assertTrue(bookingPage.isSuccessMessageDisplayed() ||
                bookingPage.isConfirmationModalDisplayed(),
                "Debería confirmarse la reserva con detalles adicionales");

        // Screenshot de evidencia
        takeScreenshot("booking_with_details");
    }

    @Test
    @DisplayName("CPS_46: Obtener código de confirmación de reserva")
    void testGetBookingConfirmationCode() {
        // Arrange
        String sala = "Sala G";
        String fecha = "2024-12-31";
        String horaInicio = "10:00";
        String horaFin = "12:00";
        String motivo = "Reunión de fin de año";

        // Act
        bookingPage.navigateToReservaciones();
        bookingPage.navigateToApartarSala();
        bookingPage.createBooking(sala, fecha, horaInicio, horaFin, motivo);

        // Assert
        if (bookingPage.isConfirmationModalDisplayed()) {
            String confirmationCode = bookingPage.getConfirmationCode();
            Assertions.assertNotNull(confirmationCode,
                    "Debería generarse un código de confirmación");
            Assertions.assertFalse(confirmationCode.isEmpty(),
                    "El código de confirmación no debería estar vacío");
        }

        // Screenshot de evidencia
        takeScreenshot("booking_confirmation_code");
    }
}
