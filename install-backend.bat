@echo off
cd /d %~dp0
echo Installing/updating backend requirements...
.venv\Scripts\python.exe -m pip install -r src\backend\requirements.txt
echo Backend requirements installed/updated successfully!
pause