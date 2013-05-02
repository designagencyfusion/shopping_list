# Shopping list

## Basic setup

### Setup environment
* `git clone git://github.com/creationix/nvm.git ~/.nvm`
* add `. ~/.nvm/nvm.sh` to .bash_profile
* `nvm install 0.10.2`
* `nvm alias default 0.10.2`
* `npm install -g supervisor`
* `brew install mongodb`

### Setup project
* open project folder
* `npm install`

### Start server
* `mongod` (in a separate terminal window/tab)
* `npm start` (in a separate terminal window/tab)
* `open http://localhost:4000`

## Heroku

### Set up Heroku account
* https://devcenter.heroku.com/articles/quickstart

### Create Heroku application & add necessary addons
* `heroku create`
* `heroku ps:scale web=1`
* `heroku addons:add mongolab`
* `heroku addons:add sendgrid`

### Set environment variables
* `heroku config:set NODE_ENV=production
