from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME", "erpdb"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "testpass"),
        port=os.getenv("DB_PORT", 5432)
    )


@app.route("/api/inventory/alerts", methods=["GET"])
def get_alerts():
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, product_name, quantity, reorder_level
            FROM inventory
            WHERE quantity <= reorder_level
        """)

        rows = cursor.fetchall()

        products = [
            {
                "id": str(row[0]),
                "product_name": row[1],
                "quantity": row[2],
                "reorder_level": row[3]
            }
            for row in rows
        ]

        return jsonify(products), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
