@echo off
set /p db_user="Enter MySQL username: "
set /p db_pass="Enter MySQL password: "

echo Creating database...
mysql -u %db_user% -p%db_pass% < setup.sql

if %errorlevel%==0 (
    echo Database and tables created successfully.
) else (
    echo ERROR: Something went wrong.
)

pause
