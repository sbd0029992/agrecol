## Características Técnicas

- ⚡️ Next.js 13
- ⚛️ React 18
- 💨 Tailwind CSS 3
- 💎 TypeScript

### 1. Instala las dependencias

Es recomendable usar **npm** para una correcta instalación de las dependencias.

```bash
npm install
```

### 2. Variables de Entorno

Crear un archivo .env en la raiz del proyecto que tenga los siguientes valores.

```bash
MONGODB_URL = "mongodb+srv://admin:p1ZkUjpvjO6n7qck@agrecol.fpbswfd.mongodb.net/agrecol"
NODE_ENV= "development"
SECRET_COOKIE_PASSWORD = "KTE2iWWSeoAA.PWEL4TyQ1rVcXiOZgPyiSsI1HuwcdCK"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="sa-east-1"
AWS_BUCKET_NAME=""
AWS_DOMAIN=""
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 2. Ejecuta el servidor de desarrollo

Puedes iniciar el servidor en modo produccion usando este comando:

```bash
npm run build

npm run start
```

o en modo desarrollo

```bash
npm run dev

```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

### 3. Convención para los mensajes de commit

Este proyecto utiliza [convencional commits](https://www.conventionalcommits.org/en/v1.0.0/), es obligatorio utilizarlo para hacer commits.
