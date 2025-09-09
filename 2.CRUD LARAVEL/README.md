# Proyecto Laravel 12

## Requisitos

1. **PHP 8.4**: Asegúrate de tener instalada la versión 8.4 de PHP para que el proyecto funcione correctamente.

2. **XAMPP**: Instala XAMPP para gestionar el servidor local y la base de datos.

3. **Composer**: Es necesario tener instalado Composer para la gestión de dependencias del proyecto.

## Instalación

1. Clona el proyecto desde el repositorio Git.
2. Copia la carpeta `proyectoVIP2cars` en la ubicación `htdocs` de tu instalación de XAMPP.
3. Ejecuta `composer install` para instalar todas las dependencias del proyecto.
4. Asegúrate de que en el archivo `.env` la configuración de la base de datos sea la siguiente:
   - `DB_CONNECTION=mysql`
   - `DB_HOST` se mantiene como está.
   - `DB_PORT` se mantiene como está.
   - `DB_DATABASE` debe ser `db_crud`.
   - `DB_USERNAME` debe ser `root`.
   - `DB_PASSWORD` debe quedarse vacío.
5. Levanta el servidor MySQL de XAMPP y configura Apache para que use el puerto 8080.
6. Ejecuta el script para crear la base de datos y las tablas necesarias.
7. Finalmente, ejecuta `php artisan serve` para levantar el servidor de desarrollo y hacer visible el proyecto.

## Notas Adicionales

- **Controlador y Modelo**: Se crearon manualmente sin usar comandos para agilizar el desarrollo. Si se requiere mayor seguridad, se pueden aplicar los comandos correspondientes.
- **Vistas**: Se implementaron modales para hacer la interfaz más interactiva y simplificada, evitando múltiples vistas. Se puede mejorar en el futuro si es necesario.
- **CRUD en `index.js`**: Todas las funciones CRUD están centralizadas en este archivo, con la posibilidad de moverlas a un archivo `service.js` en el futuro para mayor organización.
