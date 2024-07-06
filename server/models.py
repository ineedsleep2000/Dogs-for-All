from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta
import ipdb

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

# Models go here!
class Shelter(db.Model, SerializerMixin):
    __tablename__ = "shelters"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    contact_number = db.Column(db.Integer)  
    is_open = db.Column(db.Boolean)

    #Validate_name: must have name
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name')
        return name
    # Validate_address: must have address
    @validates('address')
    def validate_address(self, key, address):
        if not address:
            raise ValueError('Must have a address')
        return address
    # Validate_open: must be open or closed(True or False)
    @validates('is_open')
    def validate_open(self, key, is_open):
        if is_open and is_open not in[True, False]:
            raise ValueError('Must either be true(open) or false(closed)')
        return is_open
    # Validate_contact_number: must have phone number, length must have 10 digits
    # @validates('contact_number')
    # def validates_contact_number(self, key, contact_number):
    #     if contact_number and not contact_number.isdigit() or len(contact_number) !=10:
    #         raise ValueError('phone number must be 10 digits')
    #     return contact_number

class Dog(db.Model, SerializerMixin):
    __tablename__ = "dogs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    time_in_shelter = db.Column(db.Integer) 
    adopted = db.Column(db.Boolean)
    
    #one to many relationship
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'))
    
    adoption_applications = db.relationship('AdoptionApplication', back_populates='dog', cascade='all, delete-orphan')
    owners = association_proxy('adoption_applications', 'owner')

    #serialization rules
    serialize_rules = ('-adoption_applications.owner', '-adoption_applications.dog')

    # Validate_breed:must have a breed, if breeds not in preset list, value error
    @validates('breed')
    def validate_breed(self, key, breed):
        if breed and breed not in['pitbull', 'chihuahua', 'mutt', 'golden retriever', 'german shepherd', 'terrier', 'labradoodle']:
            raise ValueError('Must have a breed')
        return breed
    # Validate_name: must have a name
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name')
        return name
    # Validate_time_in_shelter: must be more than 1 week, can not be more than 4 weeks
    # @validates('time_in_shelter')
    # def validate_time_in_shelter(self, key, time_in_shelter):
    #     if not time_in_shelter:
    #         raise AssertionError('Must have a time in shelter date')
    #     min_date = datetime.utcnow() - timedelta(weeks=4)
    #     max_date = datetime.utcnow() - timedelta(weeks=1)
    #     if not (min_date <= time_in_shelter <= max_date):
    #         raise AssertionError('You can only input a pet that has been in the shelter for at least one week but not more than four weeks')
    #     return time_in_shelter
    
    # Validate_adopted: must be adopted or not adopted
    @validates('adopted')
    def validate_open(self, key, adopted):
        if adopted and adopted not in['True', "False"]:
            raise ValueError('Must either be true(adopted) or false(is not adopted)')
        return adopted
   

class AdoptionApplication(db.Model, SerializerMixin):
    __tablename__ = "adoption_applications"

    id = db.Column(db.Integer, primary_key=True)
    adoption_fee = db.Column(db.Float)
    is_adopted = db.Column(db.Boolean)
    
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))    
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    #many to many relationship
    owner = db.relationship('Owner', back_populates='adoption_applications')
    dog = db.relationship('Dog', back_populates='adoption_applications')

    #serialization rules
    serialize_rules = ('-owner.adoption_applications', '-dog.adoption_applications')

    # Validate_adoption_fee: must have a adoption fee, must not be lower than 0.00, must not be higher than 100.00
    @validates("adoption_fee")
    def validate_adoption_fee(self, key, adoption_fee):
        if not adoption_fee:
            raise AssertionError("No adoption_fee provided")
        if not 0.00 <= adoption_fee <= 100.00:
            raise AssertionError("adoption_fee must be between 0.00 and 100.00")
        return adoption_fee
    # Validate_shelter_id: must have a shelter id
    @validates('shelter_id')
    def validate_shelter_id(self, key, shelter_id):
        if not shelter_id:
            raise ValueError('Must have a shelter_id')
        return shelter_id
    # Validate_dog_id: must have a dog id
    @validates('dog_id')
    def validate_dog_id(self, key, dog_id):
        if not dog_id:
            raise ValueError('Must have a dog_id')
        return dog_id


class Owner(db.Model, SerializerMixin):
    __tablename__ = "owners"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    #one to many relationship
    adoption_applications = db.relationship('AdoptionApplication', back_populates='owner', cascade='all, delete-orphan')
    dogs = association_proxy('adoption_applications', 'dog')

    #serialization rules
    serialize_rules = ('-adoption_applications.owner', '-adoption_applications.dog')

    # Validate_name:must have name
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name')
        return name
    # Validate_email: must have email, must have @ in it
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("email not found")
        return address
    # Validate_password: must have password, no longer than 15 characters
    def validate_password(self, key, password):
        if not password and len(password) > 15:
            raise ValueError('Must have a password with less than 15 characters')
        return password

