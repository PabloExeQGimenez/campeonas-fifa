# Campeonas FIFA 🏆

**Campeonas FIFA** es una aplicación web Full Stack (versión MVP) construida en el marco del curso de XAcademy DEV. Está diseñada para gestionar jugadoras de FIFA. Permite la creación, edición y visualización de jugadoras con su información detallada, proporcionando una experiencia de usuario intuitiva. La aplicación integra autenticación segura y exportación de datos filtrados.

---

## 🚀 Funcionalidades del MVP

## Registro
- **Usuarios nuevos deben registrarse** ingresando un email y contraseña (6 caracteres)

### Autenticación
- **Inicio de sesión** con validación de credenciales.
- **Acceso restringido** a las funcionalidades mediante tokens JWT.

### Gestión de Jugadoras
- **Listar jugadoras** con paginación y filtros.
- **Visualizar detalles** específicos de una jugadora, incluyendo sus habilidades.
- **Crear nuevas jugadoras** y definir sus atributos (nombre, posición, club, etc.).
- **Editar la información** de jugadoras existentes.

### Gestión de Clubes
- **Visualizar clubes disponibles** para filtrar jugadoras por club.

### Exportación de Datos
- **Descargar listados** de jugadoras en formato **CSV** para análisis externo.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **Sequelize** (ORM)

### Frontend
- **HTML5**
- **CSS3**
- **Angular**

### Base de Datos
- **MySQL**

### Contenerización
- **Docker** y **Docker Compose**


---

## 📚 Librerías Utilizadas

- **Gráficos**: [ApexCharts](https://apexcharts.com/)  
- **Manejo de Archivos XLSX**: [xlsx](https://www.npmjs.com/package/xlsx)  
- **Documentación de la API**: [Swagger](https://swagger.io/)
---

## Validaciones

- **Express-validator** en Backend
- **Reactive Forms** en Frontend

## Documentación de endpoints:
http://localhost:3000/api-docs

## 🖥️ Cómo Ejecutar la Aplicación

1. Clona el repositorio desde GitHub:

   ```bash
   git clone https://github.com/PabloExeQGimenez/campeonas-fifa

2. Navega al directorio del proyecto:

  ```bash
  cd campeonas-fifa/docker
  ```
3. Levanta el entorno completo con Docker Compose:

   ```bash
   docker-compose up

# Registrarse con mail y contraseña de 6 caracteres o más
# Loguearse  


## 📧 Contacto

Desarrollado por Pablo Giménez
Correo: pablogimenez.er@gmail.com
GitHub: PabloExeQGimenez
