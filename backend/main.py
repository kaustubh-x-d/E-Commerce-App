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


if __name__ == "__main__":
    app.run(debug=True)