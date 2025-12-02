package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;

/**
 * Clase base para todos los tests
 * Configura el WebDriver y proporciona métodos comunes
 */
public class BaseTest {

    protected WebDriver driver;
    protected static final String BASE_URL = "http://localhost:5173";

    @BeforeEach
    public void setUp() {
        // Configurar WebDriverManager para ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Configurar opciones de Chrome para usar Brave
        ChromeOptions options = new ChromeOptions();
        // Ruta del ejecutable de Brave
        options.setBinary("C:\\Users\\sassech\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe");

        // Opciones adicionales para mejorar la estabilidad
        options.addArguments("--start-maximized");
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--disable-extensions");

        // Inicializar ChromeDriver con las opciones de Brave
        driver = new ChromeDriver(options);

        // Configurar timeouts
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        // Navegar a la URL base
        driver.get(BASE_URL);
    }

    @AfterEach
    public void tearDown() {
        // Cerrar el navegador
        if (driver != null) {
            driver.quit();
        }
    }

    /**
     * Toma una captura de pantalla y la guarda en la carpeta screenshots
     * 
     * @param testName Nombre del test para identificar el screenshot
     */
    protected void takeScreenshot(String testName) {
        try {
            // Generar nombre del archivo con timestamp
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = testName + "_" + timestamp + ".png";

            // Crear directorio si no existe
            File screenshotDir = new File("screenshots");
            if (!screenshotDir.exists()) {
                screenshotDir.mkdirs();
            }

            // Tomar screenshot
            File srcFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            File destFile = new File("screenshots/" + fileName);

            // Copiar archivo
            FileUtils.copyFile(srcFile, destFile);

            System.out.println("Screenshot guardado: " + destFile.getAbsolutePath());
        } catch (IOException e) {
            System.err.println("Error al tomar screenshot: " + e.getMessage());
        }
    }

    /**
     * Espera un tiempo determinado (usar solo cuando sea estrictamente necesario)
     * 
     * @param milliseconds Tiempo en milisegundos
     */
    protected void waitFor(long milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
