var express = require('express');
var router = express.Router();


var mongo = require("mongodb").MongoClient;

var collection;

mongo.connect('mongodb://127.0.0.1/blog',function(err, db){
	if(err){
		console.log("error in connecting database");
		throw err;
	} 
	collection = db.collection('posts');
	console.log("yes boss");

});

var foo = function(temp){
	collection.insert({title: temp.title, content:temp.content}, function(){
		console.log("inserted");
	});
};

router.post('/', function(req, res) {
	var temp = req.body;
	if(temp.title==='' || temp.content===''){
	  	console.log("Please fill the both");
	  	res.render('newposts');
	}else{
	  	foo(temp);
 		res.redirect('/');
	}
	  // sending a response does not pause the function
});

	/* GEThome page. */
router.get('/', function(req, res) {

	collection.find().toArray(function(err, doc){
		if(err) throw err;
		console.log(doc);
		res.render('index', {local: doc});	  	
		
	});
});

router.get('/new', function(req,res){
	res.render('newposts');	
});


module.exports = router;