#!/usr/bin/env python3
# Remote library imports
from flask import Flask, request, make_response, abort, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import Shelter, Dog, AdoptionApplication, Owner
import ipdb
import datetime 
from werkzeug.exceptions import NotFound, Unauthorized
from config import app, api, db

@app.route('/')
def index():
    return '<h1>Dogs-for-All</h1>'

class Dogs(Resource):
    def get(self):
        dogs = [dog.to_dict() for dog in Dog.query.all()]
        return make_response(dogs, 200)
    
    def post(self):
        form_json = request.get_json()
        format = '%b %d %Y %I:%M%p'
        new_dog = Dog(
            name=form_json['name'],
            image=form_json['image'],
            breed=form_json['breed'],
            time_in_shelter=datetime.datetime.strptime(form_json['time_in_shelter'], format),
            adopted=form_json['adopted'],
            shelter_id=form_json['shelter_id']
        ) 

        db.session.add(new_dog)
        db.session.commit()

        response_dict = new_dog.to_dict()

        response = make_response(response_dict, 201)

        return response
    
class Dogs_by_id(Resource):
    def get(self, id):
        dog = Dog.query.filter_by(id=id).first()
        if dog is None:
            return make_response({'error': 'Dog not found'}, 404)
        return make_response(dog.to_dict(), 200)
    
    def delete(self, id):
        dog = Dog.query.filter_by(id=id).first()
        if not dog:
            return make_response({'error': 'Dog not found'}, 404)
        db.session.delete(dog)
        db.session.commit()
        return make_response({'message': 'Dog deleted'}, 204)
    
    def patch(self,id):
        dog=db.session.get(Dog, id)
        if not dog:
            return make_response({'error': 'Dog not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(dog, key, value)
        db.session.add(dog)
        db.session.commit()
        return make_response(dog.to_dict(), 202)


class Shelters(Resource):
    def get(self):
        shelters = [shelter.to_dict() for shelter in Shelter.query.all()]
        return make_response(shelters, 200)
    
    def post(self):
        form_json = request.get_json()

        new_shelter = Shelter(
            name=form_json['name'],
            address=form_json['address'],
            contact_number=form_json['contact_number'],
            is_open=form_json['is_open']
        )

        db.session.add(new_shelter)
        db.session.commit()

        response_dict = new_shelter.to_dict()

        response = make_response(response_dict, 201)

        return response
    
class Shelters_by_id(Resource):
    def get(self, id):
        shelter = Shelter.query.filter_by(id=id).first()
        if shelter is None:
            return make_response({'error': 'Shelter not found'}, 404)
        return make_response(shelter.to_dict(), 200)
    
    def delete(self, id):
        shelter = Shelter.query.filter_by(id=id).first()
        if not shelter:
            return make_response({'error': 'Shelter not found'}, 404)
        db.session.delete(shelter)
        db.session.commit()
        return make_response({'message': 'Shelter deleted'}, 204)
    
    def patch(self,id):
        shelter=db.session.get(Shelter, id)
        if not shelter:
            return make_response({'error': 'Shelter not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(shelter, key, value)
        db.session.add(shelter)
        db.session.commit()
        return make_response(shelter.to_dict(), 202)

class Owners(Resource):
    def post(self):
        req_json = request.get_json()
        try:
            new_owner = Owner(
                name=req_json["name"],
                email=req_json["email"],
                password_hash=req_json["password"]
            )
        except ValueError as e:
            return make_response({'errors': e.args})
            # abort(422, "Some values failed validation")
        db.session.add(new_owner)
        db.session.commit()
        session["owner_id"] = new_owner.id  # give the new_owner "logged in status"
        return make_response(new_owner.to_dict(), 201)

@app.route("/login", methods=["POST"])
def login():
    owner = Owner.query.filter(Owner.name == request.get_json()["name"]).first()
    # ipdb.set_trace()
    if owner and owner.authenticate(request.get_json()["password"]):
        session["owner_id"] = owner.id  # give the owner "logged in status"
        return make_response(owner.to_dict(), 200)
    else:
        raise Unauthorized
    
@app.route("/authorized")
def authorized():
    owner = Owner.query.filter(Owner.id == session.get("owner_id")).first()
    if not owner:
        raise Unauthorized
        # abort(401, "owner is unauthorized")
    return make_response(owner.to_dict(), 200)

@app.route("/logout", methods=["DELETE"])
def logout():
    # session["user_id"] = None
    session.clear()
    return make_response({}, 204)

class AdoptionApplications(Resource):
    def post(self):
        req_json = request.get_json()
        try:
            new_adoption_application = AdoptionApplication(
                adoption_fee=req_json["adoption_fee"],
                dog_id=req_json["dog_id"],
                owner_id=req_json["owner_id"]
            )
        except ValueError as e:
            return make_response({'errors': e.args})
            # abort(422, "Some values failed validation")
        db.session.add(new_adoption_application)
        db.session.commit()
        return make_response(new_adoption_application.to_dict(), 201)

api.add_resource(Dogs, '/dogs')
api.add_resource(Dogs_by_id, '/dogs/<int:id>')
api.add_resource(Shelters, '/shelters')
api.add_resource(Shelters_by_id, '/shelters/<int:id>')
api.add_resource(Owners, "/owners", "/signup")
api.add_resource(AdoptionApplications, "/adoption_application")

if __name__ == '__main__':
    app.run(port=5555, debug=True)