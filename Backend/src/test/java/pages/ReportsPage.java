package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object para la página de Reportes
 */
public class ReportsPage extends BasePage {

    // Localizadores de elementos basados en el frontend real
    // Opción del menú principal para acceder a Generar reportes
    private By menuGenerarReportes = By.xpath("//span[contains(text(),'Generar reportes')]");

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
     * Navega al menú de Reportes desde el menú principal después del login
     * y espera a que aparezcan los campos de fecha
     */
    public void navigateToReportesFromMenu() {
        click(menuGenerarReportes);
        // Esperar a que aparezca el formulario de reportes
        waitForElement(inputFechaInicio);
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
     * Ingresa la fecha de inicio usando JavaScript (formato: YYYY-MM-DD)
     */
    public void enterFechaInicio(String fechaInicio) {
        setDateFieldValue(inputFechaInicio, fechaInicio);
    }

    /**
     * Ingresa la fecha de fin usando JavaScript (formato: YYYY-MM-DD)
     */
    public void enterFechaFin(String fechaFin) {
        setDateFieldValue(inputFechaFin, fechaFin);
    }

    /**
     * Establece el valor de un campo de fecha usando JavaScript
     * 
     * @param locator   El localizador del campo de fecha
     * @param dateValue El valor de la fecha en formato YYYY-MM-DD
     */
    private void setDateFieldValue(By locator, String dateValue) {
        waitForElement(locator);
        // Usar el descriptor nativo de React para actualizar el valor
        String script = "var input = arguments[0];" +
                "var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;"
                +
                "nativeInputValueSetter.call(input, arguments[1]);" +
                "var event = new Event('input', { bubbles: true });" +
                "input.dispatchEvent(event);" +
                "var changeEvent = new Event('change', { bubbles: true });" +
                "input.dispatchEvent(changeEvent);";
        org.openqa.selenium.JavascriptExecutor js = (org.openqa.selenium.JavascriptExecutor) driver;
        js.executeScript(script, driver.findElement(locator), dateValue);
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
        // Asegurar que el botón sea visible y clickeable
        waitForClickableElement(btnGenerarReporte);
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
