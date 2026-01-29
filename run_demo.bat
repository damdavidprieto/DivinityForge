@echo off
setlocal
title DivinityForge Launcher
echo ==========================================
echo        DIVINITY FORGE - DEMO RUNNER
echo ==========================================
echo.

:: Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] 'npm' was not found in your system.
    echo Please make sure Node.js is installed and added to your PATH.
    echo You can download it from: https://nodejs.org/
    echo.
    pause
    exit /b
)

:: Check for node_modules
if not exist node_modules (
    echo [INFO] First time setup: Installing dependencies...
    echo This may take a minute...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Installation failed. Please check your internet connection.
        pause
        exit /b
    )
)

echo.
echo [INFO] Starting development server...
echo.
echo ------------------------------------------
echo  Wait for the server to provide a link:
echo  (Usually http://localhost:5173)
echo ------------------------------------------
echo.

call npm run dev

pause

