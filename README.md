# Shop Apotheke -- Backend Challenge

backend application for discovering popular repositories on GitHub

## Getting started

### Usage

```bash
1. Clone this repository
2. `npm i`
3. `npm run start:dev`
4. View endpoints in Swagger: `http://localhost:8000/explorer/#/`
```

Docker:

```bash
1. `docker build -t sa-backend-challenge:1.0.0 . && docker run -d -p 127.0.0.1:8000:8000 --name sa-backend-challenge sa-backend-challenge:1.0.0`
```

### Linting

```bash
1. `npm run lint`
```

### Testing

```bash
1. `npm run test` OR `npm run coverage`
```

Controllers are in `src/controllers`.

## Technologies

- NodeJS
- TypeScript
- Express with Routing Controllers
- Swagger UI for documentation and debugging
- Mocha
- Docker
