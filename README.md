# Shopping list

## Basic setup

### Setup environment
* `git clone git://github.com/creationix/nvm.git ~/.nvm`
* add `. ~/.nvm/nvm.sh` to .bash_profile
* `nvm install 0.10.2`
* `nvm alias default 0.10.2`
* `npm install -g supervisor bower`
* `brew install mongodb`

### Setup project
* open project folder
* `npm install`
* `bower install`

### Start server
* `mongod` (in a separate terminal window/tab)
* `npm start` (in a separate terminal window/tab)
* `open http://localhost:4000`

## Heroku

### Set up Heroku account
* https://devcenter.heroku.com/articles/quickstart

### Create Heroku application & add necessary addons
* `heroku create`
* `heroku addons:add mongolab`
* `heroku addons:add sendgrid`

### Set environment variables
* `heroku config:set NODE_ENV=production`

### Deploy application
* `git push heroku master`
* ~~`heroku ps:scale web=1`~~

### Open application in browser
* `heroku open`

### Setup environment for Windows
* Install Node: http://nodejs.org/
* Install Mongodb: http://www.mongodb.org/dr//fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-2.6.5-signed.msi/download
* Install Node Version Manager for Windows:  https://github.com/coreybutler/nvm-windows/releases , select mvn-setup.zip
* F-secure Antivirus program may prevent first NVM installation attempt to complete. Repeat installation when necessary.
* `nvm install 0.10.2`
* `nvm alias default 0.10.2`
* `npm install -g supervisor`
* `mkdir \data\db` (db directory for Mongo)

* `mongod` (in a separate terminal window/tab, in Windows "C:\Program Files\MongoDB 2.6 Standard\bin\mongod")
* `npm start` (in a separate terminal window/tab)
* `open http://localhost:4000`
