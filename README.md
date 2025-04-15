# Sistema Gestor de Accesos (SGA)

Proyecto fullstack desarrollado con **Spring Boot (Java)** para el backend y **React** para el frontend.

## 🧩 Tecnologías utilizadas

- ⚙️ Backend: Spring Boot, Gradle, Java 17+
- 🌐 Frontend: React + Vite
- 📦 Comunicación: API REST
- 🛠️ Herramientas: Eclipse, VS Code, Git, GitHub

## 📁 Estructura del repositorio

```
SGA/
├── backend/      # Proyecto Java Spring Boot
├── frontend/     # Proyecto React
├── .gitignore
├── README.md
└── package.json  # Script para iniciar ambos proyectos
```

## 🚀 Cómo ejecutar el proyecto

### 1. Requisitos

- Java 17 o superior
- Node.js y npm
- Git

### 2. Clonar el repositorio

```bash
git clone  https://github.com/VicMeGa/SGA.git
cd SGA
```

### 3. Instalar dependencias del frontend

```bash
cd frontend
npm install
cd ..
```

### 4. Ejecutar todo (backend + frontend)

Desde la raíz del proyecto:

```bash
npm run start
```

Esto ejecutará:
- Frontend en: [http://localhost:5173](http://localhost:5173)
- Backend en: [http://localhost:8080](http://localhost:8080)

## 👥 Equipo de desarrollo

- 💻 TonoH. (Back)
- 💻 VicMega. (Front)
- 🙌 Saul, Ulises (Coolaboradores)

## 📌 Notas

- El backend está configurado con Gradle.
- Para cambiar el puerto o configuración, revisa `application.properties` en `backend/src/main/resources/`.

## 📃 Licencia

Este proyecto es de uso académico y libre para prácticas colaborativas.
