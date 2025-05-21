# ⚕️ VitalCare Back-End

![CI](https://github.com/NeriJyu/backend-vitalcare/actions/workflows/ci.yml/badge.svg?branch=main)

## How to Run the Project 🚀

To run the project, follow the instructions below:

```
npm install
cp .env.example .env
docker-compose up -d
npm run dev
```

## Documentation 📖
[localhost:3000/api/docs](localhost:3000/api/docs)

## Running the Simulator ⚙️

1. o clone the database: docker exec mongodb mongorestore /data/backup
2. Open [wokwi](https://wokwi.com/projects/429772766362621953) 💻
3. Run ▶️
4. Create a Patient ➕
5. Copy the Patient ID and paste it into WokWi 📝
6. Every 30 seconds, data is saved to MongoDB 💾, and every 1 second, data is sent to our front-end 📤

Make sure you have Node.js and Docker installed on your machine before running these commands. ✅
