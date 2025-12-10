import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
CORS(app)

# MySQL config (update with your credentials)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'mysql://root:password@localhost/mealplanner'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(100), nullable=False)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

@app.route("/")
def home():
    return {"message": "Meal Planner Backend Running!"}

# --- Meals API ---
@app.route("/api/meals", methods=["GET"])
def get_meals():
    meals = Meal.query.all()
    return jsonify([{"id": m.id, "day": m.day, "name": m.name} for m in meals])

@app.route("/api/meals", methods=["POST"])
def add_meal():
    data = request.json
    meal = Meal(day=data["day"], name=data["name"])
    db.session.add(meal)
    db.session.commit()
    return jsonify({"id": meal.id, "day": meal.day, "name": meal.name})

@app.route("/api/meals/<int:meal_id>", methods=["DELETE"])
def delete_meal(meal_id):
    meal = Meal.query.get(meal_id)
    if meal:
        db.session.delete(meal)
        db.session.commit()
        return '', 204
    return '', 404

# --- Recipes API ---
@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([{"id": r.id, "name": r.name} for r in recipes])

@app.route("/api/recipes", methods=["POST"])
def add_recipe():
    data = request.json
    recipe = Recipe(name=data["name"])
    db.session.add(recipe)
    db.session.commit()
    return jsonify({"id": recipe.id, "name": recipe.name})

@app.route("/api/recipes/<int:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if recipe:
        db.session.delete(recipe)
        db.session.commit()
        return '', 204
    return '', 404

# --- Favorites API ---
@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    favorites = Favorite.query.all()
    return jsonify([{"id": f.id, "name": f.name} for f in favorites])

@app.route("/api/favorites", methods=["POST"])
def add_favorite():
    data = request.json
    favorite = Favorite(name=data["name"])
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"id": favorite.id, "name": favorite.name})

@app.route("/api/favorites/<int:favorite_id>", methods=["DELETE"])
def delete_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return '', 204
    return '', 404

# --- Meal Suggestion API ---
@app.route("/api/suggest-meal", methods=["GET"])
def suggest_meal():
    meals = Meal.query.all()
    recipes = Recipe.query.all()
    favorites = Favorite.query.all()
    options = [m.name for m in meals] + [r.name for r in recipes] + [f.name for f in favorites]
    if options:
        suggestion = random.choice(options)
        return jsonify({"suggestion": suggestion})
    return jsonify({"suggestion": "No meals or recipes available."})

if __name__ == "__main__":
    # Cloud Run sets PORT; default to 8080 for local runs
    port = int(os.environ.get("PORT", 8080))
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=port)
