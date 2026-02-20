#!/usr/bin/env python3
"""Test PostgreSQL connection for CareSpace Enterprise"""

import sys
from pathlib import Path

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent / "backend"))

try:
    from app.core.database import engine
    print("Database URL:", engine.url)

    # Test connection
    from sqlalchemy import text
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version()"))
        version = result.fetchone()[0]
        print("✅ PostgreSQL connection successful!")
        print("Version:", version[:60] + "..." if len(version) > 60 else version)

        # Check if tables exist
        result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = [row[0] for row in result.fetchall()]
        print("Tables found:", tables)

except Exception as e:
    print("❌ Connection failed:", str(e))
    sys.exit(1)