const express=require('express');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
	client:'pg',
	connection:{
		host: '127.0.0.1',
		user:'postgres',
		password:'5411',
		database:'smartbrainpro'
	}
});

db.select('*').from('users').then( data => { console.log(data)});
const app =express();
app.use(bodyparser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send(db.users);
});

app.post('/signin',(req,res)=>{signin.handleSignin(res,req,bcrypt,db)});

app.post('/register',(req,res)=>{register.handleRegister(res,req,bcrypt,db)});

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(res,req,db)});

app.post('/image',(req,res)=>{image.handleImage(res,req,db)});


// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

app.listen(3000);