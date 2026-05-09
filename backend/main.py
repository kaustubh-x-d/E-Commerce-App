from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)

app = Flask(__name__)
CORS(app)  # allows React frontend to call Flask

# Change this in real projects
app.config["JWT_SECRET_KEY"] = "your-super-secret-key"
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
jwt = JWTManager(app)

# Demo users
USERS = {
    "admin": {
        "password": "admin123",
        "role": "admin"
    },
    "user": {
        "password": "user123",
        "role": "user"
    }
}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid request body"}), 400

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if username not in USERS:
        return jsonify({"message": "Invalid username"}), 401

    if USERS[username]["password"] != password:
        return jsonify({"message": "Invalid password"}), 401

    role = USERS[username]["role"]

    access_token = create_access_token(
        identity=username,
        additional_claims={"role": role}
    )

    return jsonify({
        "jwt_token": access_token,
        "user": {
            "username": username,
            "role": role
        }
    }), 200


@app.route("/home", methods=["GET"])
@jwt_required()
def home():
    current_user = get_jwt_identity()
    claims = get_jwt()

    return jsonify({
        "message": f"Welcome {current_user}",
        "role": claims.get("role")
    }), 200


@app.route("/admin", methods=["GET"])
@jwt_required()
def admin_route():
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"message": "Admins only"}), 403

    return jsonify({"message": "Welcome admin"}), 200

products = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "brand": "SoundMax",
        "price": 2499,
        "image_url": "https://images.unsplash.com/photo-1518441312910-7f3f6af4f5f8?auto=format&fit=crop&w=800&q=80",
        "rating": 4.5,
        "category": "Electronics",
        "description": "Noise-cancelling wireless headphones with long battery life.",
        "in_stock": True
    },
    {
        "id": 2,
        "name": "Smart Watch",
        "brand": "TechLoop",
        "price": 3999,
        "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        "rating": 4.3,
        "category": "Wearables",
        "description": "Track fitness, messages, and calls from your wrist.",
        "in_stock": True
    },
    {
        "id": 3,
        "name": "Running Shoes",
        "brand": "RunPro",
        "price": 2999,
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        "rating": 4.7,
        "category": "Footwear",
        "description": "Lightweight running shoes built for comfort and speed.",
        "in_stock": True
    },
    {
        "id": 4,
        "name": "Backpack",
        "brand": "UrbanPack",
        "price": 1499,
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        "rating": 4.1,
        "category": "Accessories",
        "description": "Durable backpack for college, travel, and everyday use.",
        "in_stock": True
    },
    {
        "id": 5,
        "name": "Bluetooth Speaker",
        "brand": "BeatBox",
        "price": 1799,
        "image_url": "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
        "rating": 4.4,
        "category": "Electronics",
        "description": "Portable speaker with deep bass and clear sound.",
        "in_stock": False
    },
    {
        "id": 6,
        "name": "T-Shirt",
        "brand": "CottonCloud",
        "price": 799,
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        "rating": 4.0,
        "category": "Clothing",
        "description": "Soft cotton t-shirt for daily wear.",
        "in_stock": True
    }
]

@app.route("/products", methods=["GET"])
def get_products():

    # Query params from React
    sort_by = request.args.get("sort_by", "")
    category = request.args.get("category", "")
    title_search = request.args.get("title_search", "")
    rating = request.args.get("rating", "")

    filtered_products = products

    # CATEGORY FILTER
    if category:
        filtered_products = [
            product
            for product in filtered_products
            if product["category"].lower() == category.lower()
        ]

    # SEARCH FILTER
    if title_search:
        filtered_products = [
            product
            for product in filtered_products
            if title_search.lower() in product["title"].lower()
        ]

    # RATING FILTER
    if rating:
        filtered_products = [
            product
            for product in filtered_products
            if product["rating"] >= int(rating)
        ]

    # SORTING
    if sort_by == "PRICE_HIGH":
        filtered_products = sorted(
            filtered_products,
            key=lambda product: product["price"],
            reverse=True
        )

    elif sort_by == "PRICE_LOW":
        filtered_products = sorted(
            filtered_products,
            key=lambda product: product["price"]
        )

    elif sort_by == "RATING":
        filtered_products = sorted(
            filtered_products,
            key=lambda product: product["rating"],
            reverse=True
        )

    return jsonify({
        "total": len(filtered_products),
        "products": filtered_products
    })


if __name__ == "__main__":
    app.run(debug=True)