#!/usr/bin/env python3
# Remote library imports
from flask import Flask, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Resource
from config import app, api
from models import db, Shelter, Dog, AdoptionApplication, Owner
# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Dogs-for-All</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

