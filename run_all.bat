@echo off
echo Starting CareSpace Enterprise (Backend + Frontend)...
echo.

echo Starting Backend in new window...
start "CareSpace Backend" cmd /k "cd /d D:\meet\CareSpace-Enterprise && call venv\Scripts\activate.bat && python backend\app\main.py"

timeout /t 3 /nobreak > nul

echo Starting Frontend...
cd /d D:\meet\CareSpace-Enterprise\Frontend
npm run dev

pause