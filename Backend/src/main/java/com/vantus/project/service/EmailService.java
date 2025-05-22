package com.vantus.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreoConQR(String destinatario, String nombre, String rutaQR) throws MessagingException {
        MimeMessage mensaje = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

        helper.setFrom("vantus.sga@gmail.com");
        helper.setTo(destinatario);
        helper.setSubject("Código QR de acceso al Sistema");
        helper.setText("<h3>Hola " + nombre + ",</h3>" +
                "<p>Adjunto encontrarás tu código QR de acceso al sistema.</p>" +
                "<p>Por favor, guárdalo para escanearlo al ingresar.</p>", true);

        FileSystemResource archivo = new FileSystemResource(new File(rutaQR));
        helper.addAttachment("codigo_qr.png", archivo);

        mailSender.send(mensaje);
    }
}