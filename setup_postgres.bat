@echo off
REM PostgreSQL Database Setup for CareSpace Enterprise
echo Setting up PostgreSQL database for CareSpace Enterprise...
echo.

echo Step 1: Creating database 'carespace_db'
echo Please enter your postgres password when prompted:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE carespace_db;"

echo.
echo Step 2: Creating user 'carespace_user' (optional)
echo Please enter your postgres password when prompted:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE USER carespace_user WITH PASSWORD 'carespace123';"

echo.
echo Step 3: Granting permissions
echo Please enter your postgres password when prompted:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE carespace_db TO carespace_user;"

echo.
echo Database setup complete!
echo.
echo Next steps:
echo 1. Create a .env file in the project root with:
echo    DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/carespace_db
echo    (or use carespace_user if you created it)
echo.
echo 2. Run: python seed_data.py
echo.
echo 3. Start the backend: cd backend && ../venv/Scripts/uvicorn.exe app.main:app --reload --host 127.0.0.1 --port 8000

pause