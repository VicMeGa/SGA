package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

/**
 * Page Object para la página de Login
 */
public class LoginPage extends BasePage {

    // Localizadores de elementos
    private By inputEmail = By.id("email");
    private By inputPassword = By.id("password");
    private By btnLogin = By.id("btn-login");
    // Toastify utiliza la clase Toastify__toast-container para los mensajes
    private By errorMessage = By.cssSelector(".Toastify__toast--error");
    private By successMessage = By.cssSelector(".Toastify__toast--success");
    // Selector para verificar que se navegó al menú principal (ruta /next)
    private By menuContainer = By.cssSelector(".MEnu, .nav");
    private By loginContainer = By.cssSelector(".login");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navega a la página de login
     */
    public void navigateToLogin() {
        driver.get("http://localhost:5173/#/");
    }

    /**
     * Ingresa el correo electrónico
     * 
     * @param email Correo electrónico del usuario
     */
    public void enterEmail(String email) {
        type(inputEmail, email);
    }

    /**
     * Ingresa la contraseña
     * 
     * @param password Contraseña del usuario
     */
    public void enterPassword(String password) {
        type(inputPassword, password);
    }

    /**
     * Hace clic en el botón de login
     */
    public void clickLoginButton() {
        click(btnLogin);
    }

    /**
     * Realiza el login completo con credenciales
     * 
     * @param email    Correo electrónico
     * @param password Contraseña
     */
    public void login(String email, String password) {
        navigateToLogin();
        enterEmail(email);
        enterPassword(password);
        clickLoginButton();
    }

    /**
     * Verifica si el mensaje de error está visible
     * Toastify muestra mensajes temporalmente, por lo que debemos esperar a que
     * aparezca
     * 
     * @return true si el mensaje de error está visible
     */
    public boolean isErrorMessageDisplayed() {
        try {
            // Esperar hasta 5 segundos a que aparezca el mensaje de error
            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
            shortWait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Verifica si el login fue exitoso (menú principal visible)
     * Espera a que la URL cambie a /next y verifica que el contenedor de login ya
     * no esté visible
     * 
     * @return true si el login fue exitoso
     */
    public boolean isLoginSuccessful() {
        try {
            // Esperar a que la URL cambie a /next (indica navegación exitosa)
            wait.until(driver -> driver.getCurrentUrl().contains("/next") || driver.getCurrentUrl().contains("#/next"));
            // Verificar que el menú principal esté visible
            return isElementVisible(menuContainer) || !isElementVisible(loginContainer);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Obtiene el texto del mensaje de error
     * 
     * @return Texto del mensaje de error
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }

    /**
     * Verifica si el mensaje de éxito está visible
     * 
     * @return true si el mensaje de éxito está visible
     */
    public boolean isSuccessMessageDisplayed() {
        return isElementVisible(successMessage);
    }

    /**
     * Obtiene el texto del mensaje de éxito
     * 
     * @return Texto del mensaje de éxito
     */
    public String getSuccessMessage() {
        return getText(successMessage);
    }

    /**
     * Obtiene la URL actual
     * 
     * @return URL actual del navegador
     */
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}
