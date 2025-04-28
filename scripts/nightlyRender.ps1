# Nightly Render Script for Hooked On Phonetics
# This script is designed to be run as a scheduled task during off-hours (00:00-05:00)
# to batch process image generation requests.

# ##ACTION-REQUIRES-ADMIN
# This script requires administrative privileges to schedule tasks

param(
    [string]$BatchFile = "$PSScriptRoot\batch_prompts.txt",
    [string]$OutputDir = "$PSScriptRoot\..\client\public\images",
    [int]$NumImages = 1,
    [int]$GpuId = 0,
    [switch]$Schedule = $false,
    [switch]$Unschedule = $false
)

$ScriptPath = "$PSScriptRoot\render_batch.py"
$TaskName = "HookedOnPhonetics_NightlyRender"

function Test-AdminPrivileges {
    $currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Schedule-Task {
    if (-not (Test-AdminPrivileges)) {
        Write-Error "Administrative privileges required to schedule tasks."
        exit 1
    }

    $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$PSScriptRoot\nightlyRender.ps1`""
    $trigger = New-ScheduledTaskTrigger -Daily -At 2am
    $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

    Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Description "Nightly batch rendering for Hooked On Phonetics" -Force
    Write-Host "Task scheduled to run daily at 2:00 AM."
}

function Unschedule-Task {
    if (-not (Test-AdminPrivileges)) {
        Write-Error "Administrative privileges required to unschedule tasks."
        exit 1
    }

    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "Task unscheduled."
}

function Run-BatchRender {
    if (-not (Test-Path $BatchFile)) {
        Write-Error "Batch file not found: $BatchFile"
        exit 1
    }

    # Check if Python is available
    try {
        $pythonVersion = python --version
        Write-Host "Using $pythonVersion"
    }
    catch {
        Write-Error "Python not found. Please install Python 3.x"
        exit 1
    }

    # Run the batch render script
    Write-Host "Starting batch render process..."
    python $ScriptPath --batch_file $BatchFile --output_dir $OutputDir --num_images $NumImages --gpu_id $GpuId
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Batch render failed with exit code $LASTEXITCODE"
        exit $LASTEXITCODE
    }
    
    Write-Host "Batch render completed successfully."
}

# Main script logic
if ($Schedule) {
    Schedule-Task
}
elseif ($Unschedule) {
    Unschedule-Task
}
else {
    Run-BatchRender
}
