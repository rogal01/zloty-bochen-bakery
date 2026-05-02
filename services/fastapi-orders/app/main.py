from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .database import DB_PATH, execute, init_db, row, rows


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, examples=["Anna Kowalska"])
    contact: str = Field(min_length=5, examples=["anna@example.com"])
    cake_size: str = Field(examples=["2.0 kg"])
    flavor: str = Field(examples=["Pistacja"])
    pickup_date: str = Field(examples=["2026-06-12"])
    pickup_location: str = Field(examples=["Nowe Brzegi, ul. Miodowa 12"])
    message: str | None = Field(default=None, examples=["Napis: Sto lat Maja"])


def calculate_price(cake_size: str) -> float:
    prices = {
        "1.2 kg": 120.0,
        "2.0 kg": 200.0,
        "3.0 kg": 280.0,
    }
    return prices.get(cake_size, 120.0)


app = FastAPI(
    title="Złoty Bochen Orders API",
    summary="FastAPI backend for the fictional bakery portfolio.",
    version="1.0.0",
)


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "database": str(DB_PATH)}


@app.get("/flavors")
def flavors() -> list[dict]:
    return rows("SELECT id, name, description, category FROM flavors ORDER BY name")


@app.get("/locations")
def locations() -> list[dict]:
    return rows(
        """
        SELECT id, city, address, type, phone, description, open_sunday
        FROM locations
        ORDER BY city
        """
    )


@app.get("/orders")
def orders() -> list[dict]:
    return rows(
        """
        SELECT id, customer_name, contact, cake_size, flavor, pickup_date,
               pickup_location, message, total_price, status, created_at
        FROM orders
        ORDER BY created_at DESC
        """
    )


@app.post("/orders", status_code=201)
def create_order(payload: OrderCreate) -> dict:
    order_id = execute(
        """
        INSERT INTO orders (
            customer_name, contact, cake_size, flavor, pickup_date,
            pickup_location, message, total_price
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload.customer_name,
            payload.contact,
            payload.cake_size,
            payload.flavor,
            payload.pickup_date,
            payload.pickup_location,
            payload.message,
            calculate_price(payload.cake_size),
        ),
    )
    created = row(
        """
        SELECT id, customer_name, contact, cake_size, flavor, pickup_date,
               pickup_location, message, total_price, status, created_at
        FROM orders
        WHERE id = ?
        """,
        (order_id,),
    )
    if not created:
        raise HTTPException(status_code=500, detail="Order was not saved")
    return created
