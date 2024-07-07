from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta

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

    dogs = db.relationship('Dog', back_populates='shelter')
    serialize_rules = ('-dogs.shelter',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name')
        return name

    @validates('address')
    def validate_address(self, key, address):
        if not address:
            raise ValueError('Must have an address')
        return address

    @validates('is_open')
    def validate_open(self, key, is_open):
        if is_open not in [True, False]:
            raise ValueError('Must either be true(open) or false(closed)')
        return is_open

    # @validates('contact_number')
    # def validates_contact_number(self, key, contact_number):
    #     if contact_number and (not contact_number.isdigit() or len(contact_number) != 10):
    #         raise ValueError('Phone number must be 10 digits')
    #     return contact_number

class Dog(db.Model, SerializerMixin):
    __tablename__ = "dogs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    time_in_shelter = db.Column(db.Integer)
    adopted = db.Column(db.Boolean)

    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'))
    shelter = db.relationship('Shelter', back_populates='dogs')

    adoption_applications = db.relationship('AdoptionApplication', back_populates='dog', cascade='all, delete-orphan')
    owners = association_proxy('adoption_applications', 'owner')

    serialize_rules = ('-shelter.dogs', '-adoption_applications.dog', '-adoption_applications.owner')

    @validates('breed')
    def validate_breed(self, key, breed):
        if breed not in ['pitbull', 'chihuahua', 'mutt', 'golden retriever', 'german shepherd', 'terrier', 'labradoodle']:
            raise ValueError('Must have a valid breed')
        return breed

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name')
        return name

    # @validates('time_in_shelter')
    # def validate_time_in_shelter(self, key, time_in_shelter):
    #     if not time_in_shelter:
    #         raise AssertionError('Must have a time in shelter date')
    #     min_date = datetime.utcnow() - timedelta(weeks=4)
    #     max_date = datetime.utcnow() - timedelta(weeks=1)
    #     if not (min_date <= time_in_shelter <= max_date):
    #         raise AssertionError('You can only input a pet that has been in the shelter for at least one week but not more than four weeks')
    #     return time_in_shelter

    @validates('adopted')
    def validate_adopted(self, key, adopted):
        if adopted not in [True, False]:
            raise ValueError('Must either be true(adopted) or false(not adopted)')
        return adopted

class AdoptionApplication(db.Model, SerializerMixin):
    __tablename__ = "adoption_applications"

    id = db.Column(db.Integer, primary_key=True)
    adoption_fee = db.Column(db.Float)
    is_adopted = db.Column(db.Boolean)

    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    owner = db.relationship('Owner', back_populates='adoption_applications')
    dog = db.relationship('Dog', back_populates='adoption_applications')

    serialize_rules = ('-owner.adoption_applications', '-dog.adoption_applications')

    @validates("adoption_fee")
    def validate_adoption_fee(self, key, adoption_fee):
        if not adoption_fee:
            raise AssertionError("No adoption_fee provided")
        if not 0.00 <= adoption_fee <= 100.00:
            raise AssertionError("adoption_fee must be between 0.00 and 100.00")
        return adoption_fee

    @validates('owner_id')
    def validate_owner_id(self, key, owner_id):
        if not owner_id:
            raise ValueError('Must have an owner_id')
        return owner_id

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

    adoption_applications = db.relationship('AdoptionApplication', back_populates='owner', cascade='all, delete-orphan')
    dogs = association_proxy('adoption_applications', 'dog')

    serialize_rules = ('-adoption_applications.owner', '-adoption_applications.dog')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name')
        return name

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Must have a valid email")
        return email

    @validates('password')
    def validate_password(self, key, password):
        if not password or len(password) > 15:
            raise ValueError('Must have a password with less than 15 characters')
        return password