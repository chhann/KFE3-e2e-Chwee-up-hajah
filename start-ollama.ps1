# Ollama Development Environment Startup Script
Write-Host "🚀 Starting Ollama Development Environment..." -ForegroundColor Yellow

# System Memory Check
function Check-SystemMemory {
    $memory = Get-WmiObject Win32_ComputerSystem
    $totalRAM = [math]::Round($memory.TotalPhysicalMemory/1GB, 2)
    Write-Host "💾 Total System RAM: ${totalRAM}GB" -ForegroundColor Cyan

    if ($totalRAM -lt 12) {
        Write-Host "⚠️ Low RAM (less than 12GB). Lightweight models recommended." -ForegroundColor Yellow
    } elseif ($totalRAM -ge 16) {
        Write-Host "✅ Sufficient RAM. All models available." -ForegroundColor Green
    } else {
        Write-Host "👍 Adequate RAM. Most models available." -ForegroundColor Green
    }
    return $totalRAM
}

$systemRAM = Check-SystemMemory

# Terminate existing processes
Get-Process ollama -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Environment Variables Check
Write-Host "`nCurrent Environment Settings:" -ForegroundColor Blue
Write-Host "  OLLAMA_NUM_PARALLEL: $env:OLLAMA_NUM_PARALLEL"
Write-Host "  OLLAMA_MAX_LOADED_MODELS: $env:OLLAMA_MAX_LOADED_MODELS"
Write-Host "  OLLAMA_FLASH_ATTENTION: $env:OLLAMA_FLASH_ATTENTION"
Write-Host "  OLLAMA_HOST: $env:OLLAMA_HOST"

# Start Server
Start-Process -FilePath "ollama" -ArgumentList "serve" -WindowStyle Hidden
Start-Sleep -Seconds 3

# Status Check
if (Get-Process ollama -ErrorAction SilentlyContinue) {
    Write-Host "`n✅ Ollama Server Started Successfully!" -ForegroundColor Green
    Write-Host "🌐 Server Address: http://localhost:11434" -ForegroundColor Cyan

    # Model List
    Write-Host "`nCurrently Available Models:" -ForegroundColor Blue
    ollama list

    # RAM-based Recommendations
    Write-Host "`n🎯 Recommended Models:" -ForegroundColor Magenta
    if ($systemRAM -lt 12) {
        Write-Host "  - qwen2.5-coder:3b-instruct (Lightweight)" -ForegroundColor Yellow
        Write-Host "  - fullstack-dev:latest (If possible)" -ForegroundColor Cyan
    } elseif ($systemRAM -lt 16) {
        Write-Host "  - fullstack-dev:latest (Custom)" -ForegroundColor Cyan
        Write-Host "  - qwen2.5-coder:7b-instruct (Main)" -ForegroundColor Cyan
    } else {
        Write-Host "  - All models available" -ForegroundColor Green
    }

    # Pre-load Models (8GB+ RAM)
    if ($systemRAM -ge 8) {
        Write-Host "`n⏳ Loading lightweight model..." -ForegroundColor Yellow
        ollama run qwen2.5-coder:3b-instruct "Hello" --verbose=false > $null 2>&1
        Write-Host "✅ Model ready" -ForegroundColor Green
    }

    Write-Host "`n🎉 Ready to use with Continue!" -ForegroundColor Magenta
} else {
    Write-Host "`n❌ Failed to start Ollama server" -ForegroundColor Red
}