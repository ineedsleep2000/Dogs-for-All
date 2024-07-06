#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Shelter, Dog, AdoptionApplication, Owner

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

  
        Dog.query.delete()
        Shelter.query.delete()
        AdoptionApplication.query.delete()
        Owner.query.delete()

        dogs = []
    
        for _ in range (10):
            d= Dog(
                name=fake.first_name(), 
                breed= 'mutt', 
                time_in_shelter= randint(7, 28), 
                adopted= False, 
                shelter_id= randint(1, 5))
            dogs.append(d)

        db.session.add_all(dogs)
        db.session.commit()

        shelters = []

        for _ in range (5):
            s=Shelter(
                name=fake.bs(),
                address=fake.address(),
                contact_number=9876543210,
                is_open= True)
            shelters.append(s)
        
        db.session.add_all(shelters)
        db.session.commit()

        adoptapps=[]

        for _ in range (10):
            a=AdoptionApplication(
                adoption_fee=randint(0.00, 100.00),
                is_adopted= True,
                owner_id=randint(1,10),
                dog_id=randint(1,10))
            adoptapps.append(a)
        db.session.add_all(adoptapps)
        db.session.commit()

        owners=[]

        for _ in range (10):
            o=Owner(
                name=fake.name(),
                email=fake.email(),
                password=fake.password())
            owners.append(o)
        db.session.add_all(owners)
        db.session.commit()

print('finished')
    