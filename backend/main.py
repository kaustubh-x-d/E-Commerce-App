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
        "title": "Wireless Headphones",
        "description": "Experience immersive audio with the SoundMax Wireless Headphones, designed for people who want premium sound without distractions. Featuring advanced noise-cancellation technology, these headphones block unwanted background sounds so you can focus on music, movies, gaming, or work calls. The soft memory-foam ear cushions provide long-lasting comfort, even during extended listening sessions. With a sleek lightweight design and up to 30 hours of battery life, they are ideal for travel, college, and everyday use. Bluetooth connectivity ensures seamless pairing with smartphones, tablets, and laptops. Built-in touch controls and voice assistant support make the listening experience smooth, modern, and effortlessly convenient.",
        "brand": "SoundMax", 
        "price": 2499, 
        "image_url": "https://trysonos.in/cdn/shop/files/product-img1_ba44c421-f0d8-488e-ae57-3c7aae7c7884.avif?v=1769060581&width=1600", 
        "rating": 4.5, 
        "category": "Electronics",
        "in_stock": True
    },
    {
        "id": 2,
        "title": "Smart Watch",
        "brand": "TechLoop", 
        "price": 3999, 
        "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", 
        "rating": 4.3, 
        "category": "Wearables",
        "in_stock": True,
        "description": "The TechLoop Smart Watch combines modern style with practical everyday functionality. Designed to keep you connected and active, it allows you to receive notifications, answer calls, monitor fitness activities, and track your heart rate directly from your wrist. The bright high-resolution display remains easy to read indoors and outdoors, while customizable watch faces let you match your personal style. It supports multiple workout modes, sleep tracking, and step counting to help maintain a healthier lifestyle. Its lightweight water-resistant design makes it suitable for workouts, travel, and daily wear. With impressive battery performance and smooth smartphone integration, this smartwatch becomes your reliable digital companion."
    },
    {
        "id": 3,
        "title": "Running Shoes",
        "brand": "RunPro", 
        "price": 2999, 
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", 
        "rating": 4.7, 
        "category": 
        "Footwear",
        "in_stock": True,
        "description": "Built for performance and comfort, the RunPro Running Shoes are designed for runners, gym enthusiasts, and anyone with an active lifestyle. The lightweight breathable mesh upper keeps your feet cool during long runs, while the cushioned sole absorbs impact for improved comfort and stability. Whether you are training on roads, treadmills, or outdoor tracks, these shoes provide reliable grip and flexibility for smooth movement. The modern sporty design also makes them stylish enough for casual everyday wear. Durable construction ensures long-term use without sacrificing comfort. From morning jogs to intense workout sessions, these running shoes help you stay comfortable, supported, and ready to move."
    },
    {
        "id": 4,
        "title": "Backpack",
        "brand": "UrbanPack",
        "price": 1499, 
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", 
        "rating": 4.1, 
        "category": "Accessories",
        "in_stock": True,
        "description": "The UrbanPack Backpack is designed for students, travelers, and professionals who need a practical yet stylish everyday bag. Crafted from durable water-resistant material, it safely protects your essentials from daily wear and unpredictable weather. The spacious main compartment easily fits books, gadgets, clothes, and accessories, while multiple smaller pockets help keep items organized and accessible. Padded shoulder straps provide comfort during long commutes or travel days, reducing strain even when carrying heavier loads. Its minimalist modern design pairs well with casual and professional outfits alike. Whether heading to college, the office, or a weekend trip, this backpack delivers reliability, functionality, and clean urban style."
    },
    {
        "id": 5,
        "title": "Bluetooth Speaker",
        "brand": "BeatBox", 
        "price": 1799, 
        "image_url": "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
        "rating": 4.4, 
        "category": "Electronics",
        "in_stock": True,
        "description": "Enjoy powerful sound anywhere with the BeatBox Bluetooth Speaker, built for music lovers who want portability without sacrificing audio quality. Despite its compact size, the speaker delivers rich bass, balanced mids, and crisp highs that fill the room with immersive sound. Wireless Bluetooth connectivity allows quick pairing with smartphones, tablets, and laptops, making it perfect for parties, travel, or relaxing at home. The durable portable design includes easy-to-use controls and long battery life for uninterrupted playback throughout the day. Its modern stylish finish adds a premium look while remaining lightweight enough to carry effortlessly. This speaker transforms everyday listening into a lively and energetic experience."
    },
    {
        "id": 6,
        "title": "T-Shirt",
        "brand": "CottonCloud", 
        "price": 799, 
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80", 
        "rating": 4.0, 
        "category": "Clothing",
        "in_stock": True,
        "description": "The CottonCloud T-Shirt is a comfortable everyday essential designed with simplicity, softness, and versatility in mind. Made from premium breathable cotton fabric, it feels lightweight against the skin and remains comfortable throughout the day. The relaxed fit allows easy movement while maintaining a clean modern silhouette suitable for casual outings, college wear, or lounging at home. Durable stitching and quality fabric help maintain shape and color even after multiple washes. Its minimalist design pairs effortlessly with jeans, joggers, or jackets, making it a reliable wardrobe staple. Whether styled casually or layered with other outfits, this t-shirt delivers comfort, practicality, and timeless everyday fashion."
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

@app.route("/products/<int:product_id>", methods=["GET"])
def get_product_details(product_id):
    product = next((item for item in products if item["id"] == product_id), None)

    if product is None:
        return jsonify({"message": "Product not found"}), 404

    return jsonify(product), 200

if __name__ == "__main__":
    app.run(debug=True)