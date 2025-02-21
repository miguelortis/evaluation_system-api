# Evaluation System API

## Instrucciones para configurar y ejecutar el proyecto

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/evaluation-system.git
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```
   MONGO_URI=Url de mongo
   JWT_SECRET=Clave secreta de JWS
   ```

4. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

El servidor debería estar corriendo en `http://localhost:3000`.

## Estructura del proyecto y decisiones de diseño

La estructura del proyecto sigue una arquitectura modular para facilitar el mantenimiento y escalabilidad. A continuación se describe la estructura principal:

```
  /controllers   # Controladores que manejan las solicitudes HTTP
  /models        # Modelos de datos y esquemas de la base de datos
  /routes        # Definición de rutas y sus manejadores
  /middlewares   # Middlewares para procesamiento de solicitudes
  /utils         # Utilidades y funciones auxiliares
```

Debo mencionar que me falto agregar una carpeta de /services para manejar por separado la Lógica de negocio y servicios, asi como tambien se pudo haber escapado algun detalle por falta de tiempo.

### Decisiones de diseño

- **Modularidad:** La separación en módulos permite que cada parte del sistema sea desarrollada y probada de manera independiente.
- **Controladores:** Los controladores se encargan de la lógica relacionada con las solicitudes HTTP y la lógica de negocio. Aunque considero que la logica de negocio debio estar separada.
- **Middlewares:** Se utilizan para tareas comunes como la autenticación, manejo de errores y validación de datos.
- **Modelos:** Definen la estructura de los datos y se encargan de la interacción con la base de datos, utilizando un ORM para simplificar las operaciones.

Esta estructura y decisiones de diseño buscan crear un código más limpio, mantenible y escalable.

```

</file>
```
