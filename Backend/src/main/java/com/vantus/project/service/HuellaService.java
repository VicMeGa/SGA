package com.vantus.project.service;
import org.springframework.stereotype.Service;
import com.machinezoo.sourceafis.FingerprintImage;
import com.machinezoo.sourceafis.FingerprintTemplate;
import com.machinezoo.sourceafis.FingerprintMatcher;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;


@Service
public class HuellaService {
         
      private static final double MATCH_THRESHOLD = 40.0;
    
    public byte[] generarTemplate(String base64Image) {
        if (base64Image == null || base64Image.isEmpty()) {
            return null;
        }
        
        try {
            BufferedImage image = decodificarBase64Image(base64Image);
            FingerprintImage fpImage = convertirAFingerprintImage(image);
            FingerprintTemplate template = new FingerprintTemplate(fpImage);
            return template.toByteArray();
        } catch (IOException e) {
            System.err.println("Error al generar template: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
    
    public boolean verificarHuella(String base64Image, byte[] templateGuardado) {
        try {
            if (base64Image == null || templateGuardado == null) {
                return false;
            }
            
            // Generar template de la nueva imagen
            byte[] nuevoTemplate = generarTemplate(base64Image);
            FingerprintTemplate templateNuevo = new FingerprintTemplate(nuevoTemplate);
            FingerprintTemplate templateAlmacenado = new FingerprintTemplate(templateGuardado);
            
            // Realizar la comparación
            double score = new FingerprintMatcher()
                .index(templateNuevo)
                .match(templateAlmacenado);
            
            return score >= MATCH_THRESHOLD;
            
        } catch (Exception e) {
            System.err.println("Error en verificación: " + e.getMessage());
            return false;
        }
    }
    
    // Método adicional para obtener el score de similitud
    public double obtenerScoreSimilitud(String base64Image, byte[] templateGuardado) {
        try {
            if (base64Image == null || templateGuardado == null) {
                return 0.0;
            }
            
            byte[] nuevoTemplate = generarTemplate(base64Image);
            FingerprintTemplate templateNuevo = new FingerprintTemplate(nuevoTemplate);
            FingerprintTemplate templateAlmacenado = new FingerprintTemplate(templateGuardado);
            
            return new FingerprintMatcher()
                .index(templateNuevo)
                .match(templateAlmacenado);
            
        } catch (Exception e) {
            System.err.println("Error calculando score: " + e.getMessage());
            return 0.0;
        }
    }
    
    private FingerprintImage convertirAFingerprintImage(BufferedImage bufferedImage) {
        // Convertir a escala de grises si es necesario
        BufferedImage grayImage = convertirAGrises(bufferedImage);
        
        int width = grayImage.getWidth();
        int height = grayImage.getHeight();
        byte[] pixelData = new byte[width * height];
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int rgb = grayImage.getRGB(x, y);
                int gray = (rgb >> 16) & 0xFF; // Usar componente rojo para escala de grises
                pixelData[y * width + x] = (byte) gray;
            }
        }
        
        return new FingerprintImage(width, height, pixelData);
    }
    
    private BufferedImage convertirAGrises(BufferedImage original) {
        if (original.getType() == BufferedImage.TYPE_BYTE_GRAY) {
            return original;
        }
        
        BufferedImage grayImage = new BufferedImage(
            original.getWidth(), 
            original.getHeight(), 
            BufferedImage.TYPE_BYTE_GRAY
        );
        
        var graphics = grayImage.createGraphics();
        graphics.drawImage(original, 0, 0, null);
        graphics.dispose();
        
        return grayImage;
    }
    
    private BufferedImage decodificarBase64Image(String base64String) throws IOException {
        if (base64String == null || base64String.trim().isEmpty()) {
            throw new IllegalArgumentException("Cadena base64 inválida");
        }
        
        String base64Data = base64String.contains(",") ? 
            base64String.split(",")[1] : base64String;
        
        byte[] imageBytes = Base64.getDecoder().decode(base64Data);
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
        
        BufferedImage image = ImageIO.read(inputStream);
        if (image == null) {
            throw new IOException("No se pudo decodificar la imagen desde base64");
        }
        
        return image;
    }

}
