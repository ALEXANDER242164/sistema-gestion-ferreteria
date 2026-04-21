[![SVG Banners](https://svg-banners.vercel.app/api?type=luminance&text1=Sistema-Gestión-Ferretería%20🌻&width=800&height=400)](https://github.com/Akshay090/svg-banners)

# Sistema de Gestión para Ferretería

Este repositorio contiene el código fuente y la documentación para un sistema de escritorio de gestión de ferreterías, desarrollado como un proyecto académico para la Universidad Autónoma de Yucatán.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [Cómo Compilar y Ejecutar](#cómo-compilar-y-ejecutar)
- [Documentación](#documentación)

## Descripción del Proyecto

El objetivo es crear una aplicación de escritorio robusta en Java que permita a los administradores de una ferretería gestionar eficientemente las operaciones diarias, desde el control de inventario y ventas hasta la gestión de proveedores y la generación de reportes.

## Características

El sistema contará con los siguientes módulos principales:

- **Inventario:** Gestión del catálogo de productos, control de niveles de stock y alertas de existencias bajas.
- **Ventas:** Procesamiento de transacciones de venta y generación de recibos.
- **Compras:** Creación y seguimiento de órdenes de compra a proveedores.
- **Proveedores:** Registro y administración de la información de contacto de los proveedores.
- **Clientes:** Mantenimiento de un registro de clientes y su historial de compras.
- **Reportes:** Generación de informes de ventas e inventario (diarios, mensuales, anuales).

## Arquitectura y Tecnologías

- **Lenguaje:** Java 17
- **Gestor de dependencias:** Apache Maven
- **Interfaz de Usuario (UI):** Java Swing o JavaFX (pendiente de decisión).
- **Arquitectura:** El proyecto sigue un patrón de diseño MVC (Modelo-Vista-Controlador) para separar la lógica de negocio, los datos y la presentación.
  - `model`: Contiene las entidades del dominio (Producto, Venta, Cliente, etc.).
  - `service`: Se encarga de la lógica de negocio y el acceso a datos.
  - `controller`: Coordina la interacción entre la vista y los servicios.

## Estructura del Repositorio

```
.
├── docs/               # Documentación del diseño (requisitos, diagramas UML, etc.)
├── sistema/            # Raíz del proyecto Maven
│   ├── pom.xml         # Archivo de configuración de Maven
│   └── src/
│       ├── main/
│       │   └── java/
│       │       └── com/
│       │           └── proyecto/
│       │               ├── controller/
│       │               ├── model/
│       │               ├── service/
│       │               └── Main.java   # Punto de entrada de la aplicación
│       └── test/       # Pruebas unitarias
└── README.md           # Este archivo
```

## Cómo Compilar y Ejecutar

Todos los comandos deben ejecutarse desde el directorio `sistema/`.

```bash
# Navegar al directorio del proyecto
cd sistema

# Compilar el código fuente
mvn clean compile

# Ejecutar la aplicación
mvn exec:java -Dexec.mainClass="com.proyecto.Main"

# Ejecutar las pruebas
mvn test

# Empaquetar la aplicación en un archivo JAR
mvn package
```

## Documentación

Toda la documentación de análisis y diseño se encuentra en la carpeta [`docs/`](docs/). A continuación se detallan los documentos clave:

- **Requisitos:** [requisitos.md](docs/requisitos.md) - Requisitos funcionales y no funcionales.
- **Historias de Usuario:** [historiasUsuario.md](docs/historiasUsuario.md) - Historias de usuario con criterios de aceptación.
- **Diagramas de Clases:** [diagramasClases.md](docs/diagramasClases.md) - Diagramas de clases del sistema (en progreso).
- **Diagramas de Casos de Uso:** [diagramaCasosUso.md](docs/diagramaCasosUso.md) - Diagramas de casos de uso (pendientes).
- **Diagramas de Actividad:** [diagramasActividad.md](docs/diagramasActividad.md) - Diagramas de actividad (pendientes).
- **Diagramas de Secuencia:** [diagramasSecuencia.md](docs/diagramasSecuencia.md) - Diagramas de secuencia (pendientes).
