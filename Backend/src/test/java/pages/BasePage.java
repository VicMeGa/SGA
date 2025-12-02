package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Clase base para todos las paginas conteniedno elementos comunes de interacción con elementos
 */
public class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    /**
     * Espera a que un elemento sea visible y lo retorna
     */
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    /**
     * Espera a que un elemento sea clickeable y lo retorna
     */
    protected WebElement waitForClickableElement(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /**
     * Hace clic en un elemento después de esperar que sea clickeable
     */
    protected void click(By locator) {
        waitForClickableElement(locator).click();
    }

    /**
     * Escribe texto en un campo después de esperar que sea visible
     */
    protected void type(By locator, String text) {
        WebElement element = waitForElement(locator);
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Obtiene el texto de un elemento después de esperar que sea visible
     */
    protected String getText(By locator) {
        return waitForElement(locator).getText();
    }

    /**
     * Verifica si un elemento está visible
     */
    protected boolean isElementVisible(By locator) {
        try {
            return waitForElement(locator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Verifica si un elemento está visible con un timeout personalizado
     */
    protected boolean isElementVisible(By locator, int timeoutSeconds) {
        try {
            WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            return customWait.until(ExpectedConditions.visibilityOfElementLocated(locator)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Espera a que un elemento desaparezca
     */
    protected void waitForElementToDisappear(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    /**
     * Espera a que aparezca texto específico en un elemento
     */
    protected boolean waitForTextInElement(By locator, String text) {
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    /**
     * Selecciona una opción de un select por texto visible
     */
    protected void selectByVisibleText(By locator, String text) {
        WebElement element = waitForElement(locator);
        Select select = new Select(element);
        select.selectByVisibleText(text);
    }
}
