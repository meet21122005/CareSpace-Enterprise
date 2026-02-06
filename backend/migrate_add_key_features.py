#!/usr/bin/env python3
"""
Migration script to add key_features column to products table.
Run this script to update the database schema.
"""

import sqlite3
import os

def migrate_database():
    """Add key_features column to products table."""
    db_path = os.path.join(os.path.dirname(__file__), 'carespace.db')

    if not os.path.exists(db_path):
        print(f"Database file not found at {db_path}")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Check if key_features column already exists
        cursor.execute("PRAGMA table_info(products)")
        columns = cursor.fetchall()
        column_names = [col[1] for col in columns]

        if 'key_features' not in column_names:
            print("Adding key_features column to products table...")
            cursor.execute("ALTER TABLE products ADD COLUMN key_features TEXT")
            conn.commit()
            print("✓ Successfully added key_features column")
        else:
            print("✓ key_features column already exists")

        conn.close()

    except Exception as e:
        print(f"Error during migration: {e}")
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    migrate_database()