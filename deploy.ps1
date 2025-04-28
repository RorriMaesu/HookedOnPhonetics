# Deployment Script for Hooked On Phonetics
# This script builds and deploys the application to Azure Static Web Apps

param(
    [string]$Environment = "development",
    [switch]$SkipTests = $false,
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Stop"

# Configuration
$appName = "hooked-on-phonetics"
$clientDir = "$PSScriptRoot\client"
$serverDir = "$PSScriptRoot\server"
$distDir = "$clientDir\dist"

function Test-CommandExists {
    param($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try {
        if (Get-Command $command) { return $true }
    }
    catch { return $false }
    finally { $ErrorActionPreference = $oldPreference }
}

function Invoke-BuildProcess {
    Write-Host "Building for environment: $Environment" -ForegroundColor Cyan
    
    # Run tests if not skipped
    if (-not $SkipTests) {
        Write-Host "Running tests..." -ForegroundColor Cyan
        pnpm test
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Tests failed with exit code $LASTEXITCODE"
            exit $LASTEXITCODE
        }
        Write-Host "Tests passed successfully." -ForegroundColor Green
    }
    else {
        Write-Host "Skipping tests." -ForegroundColor Yellow
    }
    
    # Build the application if not skipped
    if (-not $SkipBuild) {
        Write-Host "Building application..." -ForegroundColor Cyan
        pnpm build
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Build failed with exit code $LASTEXITCODE"
            exit $LASTEXITCODE
        }
        Write-Host "Build completed successfully." -ForegroundColor Green
    }
    else {
        Write-Host "Skipping build." -ForegroundColor Yellow
    }
}

function Deploy-ToAzure {
    Write-Host "Deploying to Azure Static Web Apps..." -ForegroundColor Cyan
    
    # Check if Azure CLI is installed
    if (-not (Test-CommandExists "az")) {
        Write-Error "Azure CLI is not installed. Please install it first."
        exit 1
    }
    
    # Check if logged in to Azure
    $azAccount = az account show 2>$null | ConvertFrom-Json
    if (-not $azAccount) {
        Write-Host "Not logged in to Azure. Please log in." -ForegroundColor Yellow
        az login
    }
    
    # Deploy using Azure CLI
    # Note: This is a placeholder. You would need to configure your Azure Static Web App deployment.
    Write-Host "Deploying to Azure Static Web Apps (placeholder)..." -ForegroundColor Cyan
    
    # Example command (commented out as it's just a placeholder)
    # az staticwebapp deploy --source $distDir --app-name $appName --env $Environment
    
    Write-Host "Deployment completed successfully (simulated)." -ForegroundColor Green
}

# Main script execution
try {
    # Check if pnpm is installed
    if (-not (Test-CommandExists "pnpm")) {
        Write-Error "pnpm is not installed. Please install it first."
        exit 1
    }
    
    # Run the build process
    Invoke-BuildProcess
    
    # Deploy to Azure
    Deploy-ToAzure
    
    Write-Host "Deployment process completed successfully." -ForegroundColor Green
}
catch {
    Write-Error "Deployment failed: $_"
    exit 1
}
