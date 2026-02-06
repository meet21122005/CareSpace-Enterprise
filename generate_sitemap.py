#!/usr/bin/env python3
"""
Sitemap Generator Runner
Runs the sitemap generator from the backend directory
"""
import subprocess
import sys
from pathlib import Path

def main():
    """Run the sitemap generator"""
    backend_dir = Path(__file__).parent / "backend"
    sitemap_script = backend_dir / "generate_sitemap.py"

    if not sitemap_script.exists():
        print("❌ Error: generate_sitemap.py not found in backend directory")
        return 1

    try:
        # Run the sitemap generator
        result = subprocess.run([
            sys.executable, str(sitemap_script)
        ], cwd=str(backend_dir), capture_output=True, text=True)

        print(result.stdout)
        if result.stderr:
            print("Errors:", result.stderr)

        return result.returncode

    except Exception as e:
        print(f"❌ Error running sitemap generator: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())