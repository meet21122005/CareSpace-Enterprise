from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlite3
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./carespace.db")

# Configure SQLite for better reload handling and concurrency
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=False,  # Set to True for SQL debugging
    pool_pre_ping=True,  # Verify connections before using them
    pool_recycle=3600,  # Recycle connections every hour
)

# Add SQLite pragma configurations for reliability
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    """Configure SQLite pragmas for better reliability with hot reload."""
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")  # Use Write-Ahead Logging for better concurrency
    cursor.execute("PRAGMA synchronous=NORMAL")  # Balance between safety and performance
    cursor.execute("PRAGMA foreign_keys=ON")  # Enable foreign key constraints
    cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
