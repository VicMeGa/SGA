package com.vantus.project.controller;

import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfWriter;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Chunk;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.vantus.project.dto.AccesoDTO;
import com.vantus.project.dto.ApartadoSalaDTO;
import com.vantus.project.dto.PrestamoDTO;
import com.vantus.project.model.Acceso;
import com.vantus.project.model.Apartado_Sala;
import com.vantus.project.model.Prestamo;
import com.vantus.project.repository.AccesoRepository;
import com.vantus.project.repository.ApartadoSalaRepository;
import com.vantus.project.repository.PrestamoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/sga/reportes")
public class ReporteController {

    @Autowired
    private AccesoRepository accesoRepo;

    @Autowired
    private PrestamoRepository prestamoRepo;

    @Autowired
    private ApartadoSalaRepository apartadoRepo;

    @GetMapping(value = "/reporte-accesos", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generarReporteAccesos(@RequestParam String inicio, @RequestParam String fin)
            throws Exception {

        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        LocalDateTime fechaInicio = LocalDateTime.parse(inicio + "T00:00:00", inputFormatter);
        LocalDateTime fechaFin = LocalDateTime.parse(fin + "T23:59:59", inputFormatter);

        List<Acceso> accesos = accesoRepo.findByFechaHoraEntradaBetween(fechaInicio, fechaFin);

        List<AccesoDTO> dtoList = accesos.stream().map(a -> new AccesoDTO(
                a.getUsuario().getNombre() + " " + a.getUsuario().getApellido_paterno(),
                a.getSala().getNombreSala(),
                a.getTipoAcceso(),
                a.getFechaHoraEntrada())).toList();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 54, 36); // márgenes

        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPageEvent(new PdfPageEventHelper() {
            @Override
            public void onEndPage(PdfWriter writer, Document document) {
                Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 8, Font.ITALIC);
                Phrase footer = new Phrase("Página " + writer.getPageNumber(), footerFont);
                ColumnText.showTextAligned(writer.getDirectContent(),
                        Element.ALIGN_CENTER, footer,
                        (document.right() - document.left()) / 2 + document.leftMargin(),
                        document.bottom() - 10, 0);
            }
        });

        document.open();

        // Título
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
        Paragraph title = new Paragraph("Reporte de Accesos", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Subtítulo
        Font subFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
        document.add(new Paragraph("Rango de fechas: " + inicio + " a " + fin, subFont));
        document.add(new Paragraph("Fecha de generación: " + LocalDateTime.now().format(outputFormatter), subFont));
        document.add(Chunk.NEWLINE);

        // Tabla
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[] { 3, 2, 3, 2 });

        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11);
        Font cellFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

        Stream.of("Usuario", "Sala", "Fecha/Hora", "Tipo de Acceso").forEach(header -> {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(5);
            table.addCell(cell);
        });

        for (AccesoDTO dto : dtoList) {
            table.addCell(new PdfPCell(new Phrase(dto.getNombreUsuario(), cellFont)));
            table.addCell(new PdfPCell(new Phrase(dto.getNombreSala(), cellFont)));
            table.addCell(new PdfPCell(new Phrase(dto.getFechaHoraEntrada().format(outputFormatter), cellFont)));
            table.addCell(new PdfPCell(new Phrase(String.valueOf(dto.getTipoAcceso()), cellFont)));
        }

        document.add(table);
        document.add(Chunk.NEWLINE);

        // Obtener y mapear préstamos
        List<Prestamo> prestamos = prestamoRepo.findByFechaHoraPrestamoBetween(fechaInicio, fechaFin);
        List<PrestamoDTO> prestamoDTOs = prestamos.stream().map(p -> new PrestamoDTO(
                p.getUsuario().getNombre() + " " + p.getUsuario().getApellido_paterno(),
                p.getArticulo().getNombre(),
                p.getFechaHoraPrestamo(),
                p.getFechaHoraDevolucion())).toList();

        // Subtítulo
        Paragraph subtituloPrestamo = new Paragraph("Préstamos de Artículos", titleFont);
        subtituloPrestamo.setSpacingBefore(20);
        subtituloPrestamo.setAlignment(Element.ALIGN_CENTER);
        document.add(subtituloPrestamo);

        // Tabla de préstamos
        PdfPTable tablePrestamo = new PdfPTable(4);
        tablePrestamo.setWidthPercentage(100);
        tablePrestamo.setWidths(new float[] { 3, 3, 3, 3 });

        Stream.of("Usuario", "Artículo", "Fecha Préstamo", "Fecha Devolución").forEach(header -> {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(5);
            tablePrestamo.addCell(cell);
        });

        for (PrestamoDTO dto : prestamoDTOs) {
            tablePrestamo.addCell(new PdfPCell(new Phrase(dto.getNombreUsuario(), cellFont)));
            tablePrestamo.addCell(new PdfPCell(new Phrase(dto.getNombreArticulo(), cellFont)));
            tablePrestamo
                    .addCell(new PdfPCell(new Phrase(dto.getFechaHoraPrestamo().format(outputFormatter), cellFont)));
            tablePrestamo.addCell(new PdfPCell(new Phrase(
                    dto.getFechaHoraDevolucion() != null ? dto.getFechaHoraDevolucion().format(outputFormatter)
                            : "No devuelto",
                    cellFont)));
        }
        document.add(tablePrestamo);

        // Obtener y mapear apartados
        List<Apartado_Sala> apartados = apartadoRepo.findByFechaHoraInicioBetween(fechaInicio, fechaFin);
        List<ApartadoSalaDTO> apartadoDTOs = apartados.stream().map(a -> new ApartadoSalaDTO(
                a.getAdministrativo().getUsuario().getNombre() + " " + a.getAdministrativo().getUsuario().getApellido_paterno(),
                a.getSala().getNombreSala(),
                a.getDia(),
                a.getFechaHoraInicio(),
                a.getFechaHoraFin())).toList();

        // Subtítulo
        Paragraph subtituloApartado = new Paragraph("Apartados de Sala", titleFont);
        subtituloApartado.setSpacingBefore(20);
        subtituloApartado.setAlignment(Element.ALIGN_CENTER);
        document.add(subtituloApartado);

        // Tabla de apartados
        PdfPTable tableApartado = new PdfPTable(5);
        tableApartado.setWidthPercentage(100);
        tableApartado.setWidths(new float[] { 3, 2, 2, 2, 2 });

        Stream.of("Administrativo", "Sala", "Día", "Inicio", "Fin").forEach(header -> {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(5);
            tableApartado.addCell(cell);
        });

        for (ApartadoSalaDTO dto : apartadoDTOs) {
            tableApartado.addCell(new PdfPCell(new Phrase(dto.getNombreAdministrativo(), cellFont)));
            tableApartado.addCell(new PdfPCell(new Phrase(dto.getNombreSala(), cellFont)));
            tableApartado.addCell(new PdfPCell(new Phrase(dto.getDia(), cellFont)));
            tableApartado.addCell(new PdfPCell(new Phrase(dto.getFechaHoraInicio().format(outputFormatter), cellFont)));
            tableApartado.addCell(new PdfPCell(new Phrase(dto.getFechaHoraFin().format(outputFormatter), cellFont)));
        }
        document.add(tableApartado);

        // Firma opcional
        Paragraph firma = new Paragraph("___________________________\nResponsable del Reporte", cellFont);
        firma.setAlignment(Element.ALIGN_RIGHT);
        firma.setSpacingBefore(30);
        document.add(firma);

        document.close();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=accesos.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(baos.toByteArray());
    }

}
