package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pages.LoginPage;
import pages.ReportsPage;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Tests para el caso de uso: Exportar Reportes (CPS_28)
 */
class ExportReportTest extends BaseTest {

    private LoginPage loginPage;
    private ReportsPage reportsPage;

    // Fechas predefinidas para las pruebas: 10/03/25 al 20/11/25
    private static final String FECHA_INICIO = "2025-03-10";
    private static final String FECHA_FIN = "2025-11-20";

    @BeforeEach
    void loginBeforeTest() {
        // Login previo necesario para acceder a la funcionalidad
        loginPage = new LoginPage(driver);
        reportsPage = new ReportsPage(driver);

        // Realizar login con credenciales válidas
        loginPage.login("saul@gmail.com", "123");

        // Esperar a que el login se complete y navegar a reportes
        waitFor(1000);
        reportsPage.navigateToReportes();
    }

    @Test
    @DisplayName("CPS_28: Generar reporte PDF con fechas válidas (10/03/25 - 20/11/25)")
    void testGenerateReport() {
        // Arrange - Usar las fechas predefinidas: 10/03/25 al 20/11/25

        // Act - Ingresar fechas y generar reporte
        reportsPage.enterFechaInicio(FECHA_INICIO);
        reportsPage.enterFechaFin(FECHA_FIN);
        reportsPage.clickGenerarReporte();

        // Esperar a que se cargue el PDF
        waitFor(3000);

        // Assert - Verificar que el PDF se muestra en el iframe
        Assertions.assertTrue(reportsPage.isPDFDisplayed(),
                "El reporte PDF debe mostrarse en el iframe");

        Assertions.assertTrue(reportsPage.isReportContainerDisplayed(),
                "El contenedor del reporte debe estar visible");

        // Screenshot de evidencia
        takeScreenshot("export_report_pdf_success");
    }

}
