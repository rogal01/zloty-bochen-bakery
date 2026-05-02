from fastapi.testclient import TestClient

from app.main import app


def main() -> None:
    with TestClient(app) as client:
        assert client.get("/health").status_code == 200
        assert client.get("/flavors").status_code == 200
        assert client.get("/locations").status_code == 200
        response = client.post(
            "/orders",
            json={
                "customer_name": "Demo Client",
                "contact": "demo@example.com",
                "cake_size": "2.0 kg",
                "flavor": "Pistacja",
                "pickup_date": "2026-06-12",
                "pickup_location": "Nowe Brzegi, ul. Miodowa 12",
                "message": "Portfolio smoke test",
            },
        )
        assert response.status_code == 201, response.text
        assert response.json()["total_price"] == 200.0
    print("FastAPI smoke test passed")


if __name__ == "__main__":
    main()
