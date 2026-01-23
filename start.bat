@echo off
echo Starting Job Announcement CV Processor...
echo.

echo Starting backend server...
start "Backend" cmd /k "cd src\backend && call ..\..\.venv\Scripts\activate.bat && uvicorn main:app --reload --host 127.0.0.1 --port 8000"

timeout /t 2 /nobreak > nul

echo Starting frontend server...
start "Frontend" cmd /k "cd src\frontend && pnpm dev"

echo.
echo Both services are starting...
echo - Frontend: http://localhost:3000
echo - Backend: http://127.0.0.1:8000/docs
echo.
echo Press any key to close this window...
pause > nul