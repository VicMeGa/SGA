package com.vantus.project.service;

public class EncriptacionService {

    public static String aplicarClave(String mensaje, String clave) {
        StringBuilder resultado = new StringBuilder();
        for (int i = 0; i < mensaje.length(); i++) {
            char c = mensaje.charAt(i);
            char k = clave.charAt(i % clave.length());
            resultado.append((char) (c + k % 10));
        }
        return resultado.toString();
    }

    public static String quitarClave(String mensaje, String clave) {
        StringBuilder resultado = new StringBuilder();
        for (int i = 0; i < mensaje.length(); i++) {
            char c = mensaje.charAt(i);
            char k = clave.charAt(i % clave.length());
            resultado.append((char) (c - k % 10));
        }
        return resultado.toString();
    }

    public static String numeros_vocales(String txt) {
        int longitud = txt.length();
        char[] letras = new char[longitud];

        for (int i = 0; i < longitud; i++) {
            char caracter = txt.charAt(i);
            letras[i] = caracter;
        }

        for (int j = 0; j < letras.length; j++) {
            if (letras[j] == 'a') {
                letras[j] = '1';
            } else if (letras[j] == 'e') {
                letras[j] = '2';
            } else if (letras[j] == 'i') {
                letras[j] = '3';
            } else if (letras[j] == 'o') {
                letras[j] = '4';
            } else if (letras[j] == 'u') {
                letras[j] = '5';
            } else if (letras[j] == '1') {
                letras[j] = 'a';
            } else if (letras[j] == '2') {
                letras[j] = 'e';
            } else if (letras[j] == '3') {
                letras[j] = 'i';
            } else if (letras[j] == '4') {
                letras[j] = 'o';
            } else if (letras[j] == '5') {
                letras[j] = 'u';
            }
        }
        String resultado = new String(letras);
        return resultado;
    }

    public static String transponer(String txt) {
        int longitud = txt.length();
        char[] alrevez = new char[longitud];
        //boolean mayusculaInicial = false;

        // txt = numeros_vocales(txt);

        //if (!txt.isEmpty() && Character.isUpperCase(txt.charAt(0))) {
        //    mayusculaInicial = true;
        //}

        for (int i = 0; i < longitud; i++) {
            alrevez[i] = txt.charAt(longitud - 1 - i);
        }

        String resultado = new String(alrevez);

        //if (mayusculaInicial && resultado.length() > 0) {
        //    resultado = Character.toUpperCase(resultado.charAt(0)) + resultado.substring(1).toLowerCase();
        //}

        return resultado;
    }

    public static String encriptar(String txt){

        String result = EncriptacionService.transponer(txt);
        result = EncriptacionService.numeros_vocales(result);
        result = EncriptacionService.aplicarClave(result, "$Vantus2025$");

        return result;
    }

        public static String desencriptar(String txt){

        String result = EncriptacionService.quitarClave(txt, "$Vantus2025$");
        result = EncriptacionService.numeros_vocales(result);
        result = EncriptacionService.transponer(result);

        return result;
    }

    public static void main(String[] args) {

        //String res = EncriptacionService.encriptar("310704");
        //System.out.println(res);

        String res = EncriptacionService.desencriptar("vm7><<");
        System.out.println(res);
    }
}
