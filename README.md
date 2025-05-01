# VitalCare Back-End

## Como executar o projeto

Para executar o projeto, siga as instruções abaixo:

```
npm install
cp .env.example .env
docker-compose up -d
npm run dev
```

## Executando simulador

1. Para clonar o banco de dados: docker exec mongodb mongorestore /data/backup
2. Abrir o [wokwi](https://wokwi.com/projects/429772766362621953)
3. Executar
4. A cada 30 segundos os dados são salvos no MongoDB e cada 1 segundo os dados são enviados para o nosso front-end

Certifique-se de ter o Node.js e Docker instalado em sua máquina antes de executar esses comandos.