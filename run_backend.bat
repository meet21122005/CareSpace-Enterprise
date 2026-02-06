@echo off
echo Starting CareSpace Backend...
cd /d D:\meet\CareSpace-Enterprise
call venv\Scripts\activate.bat
python backend\app\main.py
pause