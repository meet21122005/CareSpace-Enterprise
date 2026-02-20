# PostgreSQL Setup Instructions for CareSpace Enterprise

## 1. Install PostgreSQL
- Download from: https://www.postgresql.org/download/windows/
- Run the installer
- Choose default options
- Set a password for the 'postgres' user (remember this!)

## 2. Create Database
After installation, open pgAdmin (installed with PostgreSQL) or use Command Prompt:

```bash
# Connect to PostgreSQL
psql -U postgres

# In psql prompt, create database:
CREATE DATABASE carespace_db;

# Create user (optional, can use postgres)
CREATE USER carespace_user WITH PASSWORD 'your_password_here';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE carespace_db TO carespace_user;

# Exit psql
\q
```

## 3. Configure Environment
Create a `.env` file in the project root with:

```
DATABASE_URL=postgresql://postgres:your_password_here@localhost:5432/carespace_db
```

Or if you created a user:
```
DATABASE_URL=postgresql://carespace_user:your_password_here@localhost:5432/carespace_db
```

## 4. Install Dependencies (if not done)
```bash
cd backend
../venv/Scripts/pip.exe install -r requirements.txt
```

## 5. Seed Database
```bash
python seed_data.py
```

## 6. Start Backend
```bash
cd backend
../venv/Scripts/uvicorn.exe app.main:app --reload --host 127.0.0.1 --port 8000
```

## Notes
- Default PostgreSQL port is 5432
- Make sure PostgreSQL service is running
- For production, use a cloud PostgreSQL service like Vercel Postgres