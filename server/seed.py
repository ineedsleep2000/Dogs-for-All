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
    
        d1 = Dog(name="Kevin",image="https://blog.myollie.com/wp-content/uploads/2020/03/chihuahua-puppy-on-grey-background-1-.jpg",breed="chihuahua",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=1)
        dogs.append(d1)
        d2 = Dog(name="Marlene",image="https://geniusvets.s3.amazonaws.com/gv-dog-breeds/american-pitbull-1.jpg",breed="pitbull",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=2)
        dogs.append(d2)
        d3 = Dog(name="Harvey",image="https://www.thewaggintrain.com/cdn-cgi/image/q=75,f=auto,metadata=none/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=y3Zh8yXy",breed="golden retriever",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=3)
        dogs.append(d3)
        d4 = Dog(name="Bella",image="https://www.dogster.com/wp-content/uploads/2024/03/Cute-golden-labradoodle-laying-in-lush-grass_zstock_Shutterstock.jpg",breed="labradoodle",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=5)
        dogs.append(d4)
        d5 = Dog(name="Kroxa(kr-o-ah)",image="https://image.petmd.com/files/inline-images/german-shepherd-3.jpg?VersionId=QrldSoaj4srcfCInIahiKcoLSh5D0gh8",breed="german shepherd",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=4)
        dogs.append(d5)
        d6 = Dog(name="Buddy",image="https://24petconnect.com/image/A1323529/LSVG/1",breed="pitbull",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=7)
        dogs.append(d6)
        d7 = Dog(name="Lazlo",image="https://img1.wsimg.com/isteam/ip/8e323813-7f7a-476e-adb4-30f721659197/Doc4.jpg",breed="labradoodle",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=6)
        dogs.append(d7)
        d8 = Dog(name="Chanco",image="https://24petconnect.com/image/A1322161/LSVG/3",breed="pitbull",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=2)
        dogs.append(d8)
        d9 = Dog(name="Melon",image="https://24petconnect.com/image/A1326203/LSVG/3",breed="mutt",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=4)
        dogs.append(d9)
        d10 = Dog(name="Mia",image="https://24petconnect.com/image/A1325336/LSVG/3",breed="german shepherd",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=1)
        dogs.append(d10)
        d11 = Dog(name="Demi",image="https://pet-uploads.adoptapet.com/5/6/b/1134144140.jpg",breed="chihuahua",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=5)
        dogs.append(d11)
        d12 = Dog(name="Dirks",image="https://www.dirksfund.com/wp-content/uploads/2019/12/IMG_9228-1.jpeg",breed="golden retriever",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=6)
        dogs.append(d12)
        d13 = Dog(name="John",image="https://a-z-animals.com/media/2018/09/labradoodle-featured.jpg",breed="labradoodle",time_in_shelter=fake.date_between('-28d', '-7d'),adopted=False,shelter_id=8)
        dogs.append(d13)

        db.session.add_all(dogs)
        db.session.commit()


        shelters = []

        # for _ in range (5):
        #     s=Shelter(
        #         name=fake.bs(),
        #         address=fake.address(),
        #         contact_number=9876543210,
        #         is_open= True)
        #     shelters.append(s)

        s1=Shelter(name= "Happy Tails Shelter", address= "1234 Dog St, Petville",contact_number= 1234567890,is_open= True)
        shelters.append(s1)
        s2=Shelter(name= "Furry Friends Rescue", address= "5678 Paw Ave, Animal City",contact_number= 9876543210,is_open= True)
        shelters.append(s2)
        s3=Shelter(name= "Paws Shelter", address= "7890 Dog Ln, Furville",contact_number= 5551234567,is_open= True)
        shelters.append(s3)
        s4=Shelter(name= "The Animal Haven", address= "2468 Critter Ct, Petropolis",contact_number= 4442221111,is_open= True)
        shelters.append(s4)
        s5=Shelter(name= "Safe Paws Shelter", address= "1357 Pooch Pl, Barktown",contact_number= 3337891234,is_open= True)
        shelters.append(s5)
        s6=Shelter(name= "Best Friends Sanctuary", address= "8642 Wag Blvd, Dogsville",contact_number= 2224567890,is_open= True)
        shelters.append(s6)
        s7=Shelter(name= "Animal Care Center", address= "9753 Pet Rd, Animaltown",contact_number= 1119876543,is_open= True)
        shelters.append(s7)
        s8=Shelter(name= "Forever Home Shelter", address= "7531 Fur St, Critter City",contact_number= 9993216547,is_open= True)
        shelters.append(s8)
    
        
        
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
    