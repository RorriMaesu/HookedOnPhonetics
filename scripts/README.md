# Hooked On Phonetics - Scripts

This directory contains utility scripts for the Hooked On Phonetics application.

## Scripts

### render_batch.py

A Python script for batch rendering images using SDXL-Turbo.

#### Usage

```bash
python render_batch.py --prompt "Your prompt here" --output_dir "../client/public/images"
```

or

```bash
python render_batch.py --batch_file "batch_prompts.txt" --output_dir "../client/public/images"
```

#### Options

- `--prompt`: Text prompt for image generation
- `--batch_file`: Path to file containing batch prompts
- `--output_dir`: Directory to save generated images (default: "../client/public/images")
- `--num_images`: Number of images to generate per prompt (default: 1)
- `--gpu_id`: GPU ID to use for generation (default: 0)

### nightlyRender.ps1

A PowerShell script for scheduling nightly batch rendering.

#### Usage

```powershell
# Run the script directly
.\nightlyRender.ps1

# Schedule the script to run daily at 2:00 AM
.\nightlyRender.ps1 -Schedule

# Unschedule the task
.\nightlyRender.ps1 -Unschedule
```

#### Options

- `-BatchFile`: Path to the batch prompts file (default: "batch_prompts.txt")
- `-OutputDir`: Directory to save generated images (default: "../client/public/images")
- `-NumImages`: Number of images to generate per prompt (default: 1)
- `-GpuId`: GPU ID to use for generation (default: 0)
- `-Schedule`: Schedule the script to run daily at 2:00 AM
- `-Unschedule`: Unschedule the task

## Requirements

### Python Scripts

- Python 3.x
- PyTorch with CUDA support
- SDXL-Turbo dependencies

### PowerShell Scripts

- PowerShell 7.x
- Administrative privileges (for scheduling tasks)
