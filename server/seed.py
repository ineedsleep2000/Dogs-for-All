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
    
        d1 = Dog(name="Kevin",image="https://www.akc.org/wp-content/uploads/2017/11/Chihuahua-standing-in-three-quarter-view.jpg",breed="chihuahua",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=1)
        dogs.append(d1)
        d2 = Dog(name="Marlene",image="https://geniusvets.s3.amazonaws.com/gv-dog-breeds/american-pitbull-1.jpg",breed="pitbull",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=2)
        dogs.append(d2)
        d3 = Dog(name="Harvey",image="https://www.thewaggintrain.com/cdn-cgi/image/q=75,f=auto,metadata=none/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=y3Zh8yXy",breed="golden retriever",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=3)
        dogs.append(d3)
        d4 = Dog(name="Bella",image="https://www.dogster.com/wp-content/uploads/2024/03/Cute-golden-labradoodle-laying-in-lush-grass_zstock_Shutterstock.jpg",breed="labradoodle",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=4)
        dogs.append(d4)
        d5 = Dog(name="Kroxa(kr-o-ah)",image="https://image.petmd.com/files/inline-images/german-shepherd-3.jpg?VersionId=QrldSoaj4srcfCInIahiKcoLSh5D0gh8",breed="german shepherd",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=5)
        dogs.append(d5)
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
                adoption_fee=randint(0, 100),
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
                _password_hash=fake.password())
            owners.append(o)
        db.session.add_all(owners)
        db.session.commit()

print('finished')
    