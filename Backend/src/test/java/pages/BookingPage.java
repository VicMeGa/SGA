package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object para la página de Reservaciones/Booking de Salas
 */
public class BookingPage extends BasePage {

    // Localizadores de elementos - TODO: reemplazar con los selectores reales
    private By menuReservaciones = By.cssSelector("a[href*='reservaciones']"); // TODO: reemplazar con el selector real
    private By menuApartarSala = By.cssSelector("a[href*='apartar']"); // TODO: reemplazar con el selector real

    // Selección de sala
    private By selectSala = By.id("select-sala"); // TODO: reemplazar con el selector real
    private By listaSalas = By.cssSelector(".sala-item"); // TODO: reemplazar con el selector real
    private By salaDisponible = By.cssSelector(".sala-disponible"); // TODO: reemplazar con el selector real

    // Selección de fecha y hora
    private By inputFecha = By.id("fecha-reserva"); // TODO: reemplazar con el selector real
    private By selectHoraInicio = By.id("hora-inicio"); // TODO: reemplazar con el selector real
    private By selectHoraFin = By.id("hora-fin"); // TODO: reemplazar con el selector real
    private By datePickerCalendar = By.cssSelector(".datepicker-calendar"); // TODO: reemplazar con el selector real

    // Información de la reserva
    private By inputMotivo = By.id("motivo-reserva"); // TODO: reemplazar con el selector real
    private By inputDescripcion = By.id("descripcion"); // TODO: reemplazar con el selector real
    private By inputNumeroPersonas = By.id("numero-personas"); // TODO: reemplazar con el selector real

    // Recursos adicionales (opcional)
    private By checkboxProyector = By.id("checkbox-proyector"); // TODO: reemplazar con el selector real
    private By checkboxMicrofonos = By.id("checkbox-microfonos"); // TODO: reemplazar con el selector real
    private By checkboxPizarron = By.id("checkbox-pizarron"); // TODO: reemplazar con el selector real

    // Botones de acción
    private By btnVerificarDisponibilidad = By.id("btn-verificar-disponibilidad"); // TODO: reemplazar con el selector
                                                                                   // real
    private By btnConfirmarReserva = By.id("btn-confirmar-reserva"); // TODO: reemplazar con el selector real
    private By btnCancelar = By.id("btn-cancelar"); // TODO: reemplazar con el selector real

    // Mensajes y confirmaciones
    private By successMessage = By.cssSelector(".alert-success"); // TODO: reemplazar con el selector real
    private By errorMessage = By.cssSelector(".alert-error"); // TODO: reemplazar con el selector real
    private By confirmationModal = By.id("modal-confirmacion"); // TODO: reemplazar con el selector real
    private By confirmationCode = By.cssSelector(".codigo-confirmacion"); // TODO: reemplazar con el selector real
    private By disponibilidadMessage = By.cssSelector(".disponibilidad-message"); // TODO: reemplazar con el selector
                                                                                  // real

    // Detalles de la reserva confirmada
    private By bookingDetails = By.cssSelector(".booking-details"); // TODO: reemplazar con el selector real
    private By bookingId = By.cssSelector(".booking-id"); // TODO: reemplazar con el selector real

    public BookingPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navega al menú de Reservaciones
     */
    public void navigateToReservaciones() {
        click(menuReservaciones);
    }

    /**
     * Navega al submenu de Apartar Sala
     */
    public void navigateToApartarSala() {
        click(menuApartarSala);
    }

    /**
     * Selecciona una sala específica
     */
    public void selectSala(String nombreSala) {
        type(selectSala, nombreSala);
    }

    /**
     * Selecciona la fecha de la reserva
     */
    public void selectFecha(String fecha) {
        type(inputFecha, fecha);
    }

    /**
     * Selecciona la hora de inicio
     */
    public void selectHoraInicio(String horaInicio) {
        type(selectHoraInicio, horaInicio);
    }

    /**
     * Selecciona la hora de fin
     */
    public void selectHoraFin(String horaFin) {
        type(selectHoraFin, horaFin);
    }

    /**
     * Ingresa el motivo de la reserva
     */
    public void enterMotivo(String motivo) {
        type(inputMotivo, motivo);
    }

    /**
     * Ingresa la descripción de la reserva
     */
    public void enterDescripcion(String descripcion) {
        type(inputDescripcion, descripcion);
    }

    /**
     * Ingresa el número de personas
     */
    public void enterNumeroPersonas(String numeroPersonas) {
        type(inputNumeroPersonas, numeroPersonas);
    }

    /**
     * Marca la opción de proyector
     */
    public void checkProyector() {
        click(checkboxProyector);
    }

    /**
     * Marca la opción de micrófonos
     */
    public void checkMicrofonos() {
        click(checkboxMicrofonos);
    }

    /**
     * Marca la opción de pizarrón
     */
    public void checkPizarron() {
        click(checkboxPizarron);
    }

    /**
     * Hace clic en el botón Verificar Disponibilidad
     */
    public void clickVerificarDisponibilidad() {
        click(btnVerificarDisponibilidad);
    }

    /**
     * Hace clic en el botón Confirmar Reserva
     */
    public void clickConfirmarReserva() {
        click(btnConfirmarReserva);
    }

    /**
     * Hace clic en el botón Cancelar
     */
    public void clickCancelar() {
        click(btnCancelar);
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
     * Verifica si el modal de confirmación está visible
     */
    public boolean isConfirmationModalDisplayed() {
        return isElementVisible(confirmationModal);
    }

    /**
     * Verifica si hay sala disponible
     */
    public boolean isSalaDisponible() {
        return isElementVisible(salaDisponible);
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
     * Obtiene el código de confirmación de la reserva
     */
    public String getConfirmationCode() {
        return getText(confirmationCode);
    }

    /**
     * Obtiene el ID de la reserva
     */
    public String getBookingId() {
        return getText(bookingId);
    }

    /**
     * Verifica si los detalles de la reserva están visibles
     */
    public boolean isBookingDetailsDisplayed() {
        return isElementVisible(bookingDetails);
    }

    /**
     * Flujo completo: crear reserva de sala
     */
    public void createBooking(String sala, String fecha, String horaInicio,
            String horaFin, String motivo) {
        selectSala(sala);
        selectFecha(fecha);
        selectHoraInicio(horaInicio);
        selectHoraFin(horaFin);
        enterMotivo(motivo);
        clickVerificarDisponibilidad();
        clickConfirmarReserva();
    }

    /**
     * Flujo completo con recursos adicionales
     */
    public void createBookingWithResources(String sala, String fecha,
            String horaInicio, String horaFin,
            String motivo, boolean proyector,
            boolean microfonos, boolean pizarron) {
        selectSala(sala);
        selectFecha(fecha);
        selectHoraInicio(horaInicio);
        selectHoraFin(horaFin);
        enterMotivo(motivo);

        if (proyector) {
            checkProyector();
        }
        if (microfonos) {
            checkMicrofonos();
        }
        if (pizarron) {
            checkPizarron();
        }

        clickVerificarDisponibilidad();
        clickConfirmarReserva();
    }
}
