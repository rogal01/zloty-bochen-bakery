from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import Any

DB_PATH = Path(__file__).resolve().parent.parent / "bakery.db"

DEMO_LOCATIONS = [
    ("Nowe Brzegi", "ul. Miodowa 12", "Piekarnia i kawiarnia", "+48 500 700 900", "Fikcyjna główna pracownia marki.", 0),
    ("Słoneczna", "Rynek 4", "Cukiernia", "+48 500 700 901", None, 1),
    ("Młynary", "ul. Zbożowa 8", "Punkt odbioru tortów", "+48 500 700 902", None, 0),
    ("Lipowe Pole", "ul. Cukiernicza 3", "Piekarnia", "+48 500 700 903", None, 0),
    ("Jasny Las", "ul. Leśna 21", "Kawiarnia", "+48 500 700 904", None, 1),
    ("Stare Mosty", "ul. Mostowa 5", "Punkt sprzedaży", "+48 500 700 905", None, 0),
]

DEMO_FLAVORS = [
    ("Royal Choco", "Mus z gorzkiej czekolady, chrupka orzechowa i krem kakaowy.", "Premium"),
    ("Oreo", "Krem śmietankowy z ciasteczkami i lekkim biszkoptem.", "Classic"),
    ("Pistacja", "Aksamitny mus pistacjowy z białą czekoladą.", "Premium"),
    ("Rafaello", "Kokos, biała czekolada, migdały i delikatny krem.", "Classic"),
    ("Bueno", "Krem z orzechami laskowymi i karmelową nutą.", "Premium"),
]


def connect() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    with connect() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                city TEXT NOT NULL,
                address TEXT NOT NULL,
                type TEXT NOT NULL,
                phone TEXT,
                description TEXT,
                open_sunday INTEGER NOT NULL DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS flavors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name TEXT NOT NULL,
                contact TEXT NOT NULL,
                cake_size TEXT NOT NULL,
                flavor TEXT NOT NULL,
                pickup_date TEXT NOT NULL,
                pickup_location TEXT NOT NULL,
                message TEXT,
                total_price REAL NOT NULL,
                status TEXT NOT NULL DEFAULT 'new',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            """
        )

        location_count = db.execute("SELECT COUNT(*) FROM locations").fetchone()[0]
        if location_count == 0:
            db.executemany(
                """
                INSERT INTO locations (city, address, type, phone, description, open_sunday)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                DEMO_LOCATIONS,
            )

        flavor_count = db.execute("SELECT COUNT(*) FROM flavors").fetchone()[0]
        if flavor_count == 0:
            db.executemany(
                "INSERT INTO flavors (name, description, category) VALUES (?, ?, ?)",
                DEMO_FLAVORS,
            )


def rows(query: str, params: tuple[Any, ...] = ()) -> list[dict[str, Any]]:
    with connect() as db:
        return [dict(row) for row in db.execute(query, params).fetchall()]


def row(query: str, params: tuple[Any, ...] = ()) -> dict[str, Any] | None:
    with connect() as db:
        result = db.execute(query, params).fetchone()
        return dict(result) if result else None


def execute(query: str, params: tuple[Any, ...] = ()) -> int:
    with connect() as db:
        cursor = db.execute(query, params)
        db.commit()
        return int(cursor.lastrowid)
