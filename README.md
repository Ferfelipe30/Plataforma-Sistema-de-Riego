# Plataforma Web para Sistema de Riego

## Tecnologias Utilizadas

- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Javascript](https://developer.mozilla.org/en-US/docs/)
- [React](https://reactjs.org/)

## Instalación

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu maquina local.

### Pre-requisitos

- Python 3.8 o superior.
- 'pip' y 'venv' (generalmente incluidos con Python).
- [node.js](https://nodejs.org/en/)

### Pasos de instalacion

1. **Clonación del repositorio**
    ```bash
    git clone https://github.com/Ferfelipe30/Plataforma-Sistema-de-Riego.git
    cd Plataforma-Sistema-de-Riego
    ```

2. **Creacion de entorno virtual**
    ```bash
    python -m venv venv
    ```

3. **Activacion de entorno virtual**
    ```bash
    .\venv\Scripts\activate
    ```

4. **Instala las dependencias**
    (Asegurate de tener un archivo 'requirements.txt' em tu proyecto)
    ```bash
    pip install -r requirements.txt
    ```

5. **Aplica las migraciones de la base de datos**
    (Asegurate de estar ubicado en la carpeta 'backend')
    ```bash
    cd backend
    python manage.py migrate
    ```

6. **Ejecutar el servidor de desarrollo**
    ```bash
    python manage.py runserver
   ```

   La API estara disponible en 'http://127.0.0.1:8000/'.