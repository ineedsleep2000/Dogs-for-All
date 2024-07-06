#!/usr/bin/env python3
# Remote library imports
from flask import Flask, request, make_response
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
class Dogs(Resource):
    def get(self):
        dogs = [dog.to_dict for dog in Dog.array.all()]
        return make_response(dogs, 200)
    
    def post(self):
        form_json= request.get_json

        new_dog = Dog(
            name=form_json['name'],
            breed=form_json['breed'],
            time_in_shelter=form_json['time_in_shelter'],
            adopted=form_json['adopted'],
            shelter_id=form_json['shelter_id']
        )

        db.session.add(new_dog)
        db.session.commit()

        response_dict = new_dog.to_dict()

        response = make_response(response_dict,201)

        return response
    
class Dogs_by_id(Resource):
    def get_by_id(self):
        dog=Dog.query.filter_by(id=id).first()
        return make_response(dog.to_dict, 200)
    
    def delete(self):
        dog=Dog.query.filter_by(id=id).first()
        if not dog:
            return 404
        db.session.delete(dog)
        db.session.commit()
        return "deleted", 204

class Shelters(Resource):
    def get(self):
        shelters = [shelter.to_dict for shelter in Shelter.array.all()]
        return make_response(shelters, 200)
    
    def post(self):
        form_json= request.get_json

        new_shelter = Shelter(
            name=form_json['name'],
            address=form_json['address'],
            contact_number=form_json['contact_number'],
            is_open=form_json['is_open']
        )

        db.session.add(new_shelter)
        db.session.commit()

        response_dict = new_shelter.to_dict()

        response = make_response(response_dict,201)

        return response
    
class Shelters_by_id(Resource):
    def get_by_id(self):
        shelter=shelter.query.filter_by(id=id).first()
        return make_response(shelter.to_dict, 200)
    
    def delete(self):
        shelter=shelter.query.filter_by(id=id).first()
        if not shelter:
            return 404
        db.session.delete(shelter)
        db.session.commit()
        return "deleted", 204

@app.route('/')
def index():
    return '<h1>Dogs-for-All</h1>'

api.add_resource(Dogs, '/dogs')
api.add_resource(Dogs_by_id, '/dogs/<int:id>')
api.add_resource(Shelters, '/shelter')
api.add_resource(Shelters_by_id, '/shelter/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

