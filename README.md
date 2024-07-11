Dogs-for-all
Authors: Brian Tuttle, Jessica Pichardo

the basic functionality should have all the available dogs, for all the shelters provided. You should be able to log into our app with a email and password, or you should be able to register a new account with us so that you can adopt a dog. as a staff member you are able to make edits to dogs, add dogs, and delete dogs. You can also add, delete and edit shelters.

#to run app
in command line, run:
$pipenv install
$pipenv shell
$npm install --prefix client

in pipenv shell:
$cd server
$flask db init
$flask db migrate -m'initialization'
$flask db upgrade head

to run server:
_IMPORTANT_ you must have the required secret-key and place it into .env, get this key from an author of this directory so that you can log in and use registration properly.

to run backend server:
$pipenv shell
$cd server
$python app.py

to run front end server:
$npm start --prefix client

#Structure of app
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│ ├── README.md
│ ├── package.json
│ ├── public
│ └── src
| |──components
| |──css
└── server
├── app.py
├── config.py
├── models.py
└── seed.py

```

```
