package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object para la página de Reportes
 */
public class ReportsPage extends BasePage {

    // Localizadores de elementos basados en el frontend real
    // Botón de navegación en el Nav (último botón nav-item que lleva a /Reportes)
    private By btnNavReportes = By.xpath("//nav[@class='nav']//button[@class='nav-item'][last()]");

    // Campos de fecha (inputs tipo date)
    private By inputFechaInicio = By.cssSelector(".upRepor input[type='date'][placeholder='Fecha Inicio']");
    private By inputFechaFin = By.cssSelector(".upRepor input[type='date'][placeholder='Fecha Fin']");

    // Botones de acción (solo hay Generar Reporte y Exportar Reporte)
    private By btnGenerarReporte = By.xpath("//button[contains(text(),'Generar Reporte')]");
    private By btnExportarReporte = By.xpath("//button[contains(text(),'Exportar Reporte')]");

    // Contenedor del reporte PDF
    private By reportee = By.cssSelector(".reportee");
    private By iframePDF = By.cssSelector("iframe[title='Reporte PDF']");

    // Mensajes de alerta (usando alert nativo de JavaScript)
    // La aplicación usa alert() nativo, por lo que necesitaremos manejar alertas
    // del navegador

    public ReportsPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navega al menú de Reportes haciendo clic en el botón del Nav
     * y espera a que aparezcan los campos de fecha
     */
    public void navigateToReportes() {
        click(btnNavReportes);
        // Esperar a que aparezca el formulario de reportes
        waitForElement(inputFechaInicio);
    }

    /**
     * Ingresa la fecha de inicio (formato: YYYY-MM-DD)
     */
    public void enterFechaInicio(String fechaInicio) {
        type(inputFechaInicio, fechaInicio);
    }

    /**
     * Ingresa la fecha de fin (formato: YYYY-MM-DD)
     */
    public void enterFechaFin(String fechaFin) {
        type(inputFechaFin, fechaFin);
    }

    /**
     * Configura filtros básicos de fecha
     */
    public void setDateRange(String fechaInicio, String fechaFin) {
        enterFechaInicio(fechaInicio);
        enterFechaFin(fechaFin);
    }

    /**
     * Hace clic en el botón Generar Reporte
     */
    public void clickGenerarReporte() {
        click(btnGenerarReporte);
    }

    /**
     * Hace clic en el botón Exportar Reporte
     */
    public void clickExportarReporte() {
        click(btnExportarReporte);
    }

    /**
     * Verifica si el iframe del PDF está visible
     */
    public boolean isPDFDisplayed() {
        return isElementVisible(iframePDF);
    }

    /**
     * Verifica si el contenedor del reporte está visible
     */
    public boolean isReportContainerDisplayed() {
        return isElementVisible(reportee);
    }

    /**
     * Verifica si apareció una alerta del navegador
     * 
     * @return true si hay una alerta presente
     */
    public boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Obtiene el texto de la alerta del navegador
     */
    public String getAlertText() {
        return driver.switchTo().alert().getText();
    }

    /**
     * Acepta la alerta del navegador
     */
    public void acceptAlert() {
        driver.switchTo().alert().accept();
    }

    /**
     * Flujo completo: configurar fechas y generar reporte PDF
     */
    public void generatePDFReport(String fechaInicio, String fechaFin) {
        setDateRange(fechaInicio, fechaFin);
        clickGenerarReporte();
    }
}
