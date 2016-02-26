var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require("moment")

app.listen(port)


console.log('immoc started on port ', port)

// index page
app.get('/', function  (req, res) {
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}

		res.render("index",{
			title: 'immoc home page',
			movies: movies
		});
	})

})


// detail page
app.get('/movie/:id', function  (req, res) {
	var id = req.params.id;
	console.log("id is ", id)

	Movie.findById(id, function(err, movie){
		if(err){
			console.log(err)
		}
		res.render("detail",{
			title: 'imooc detail',
			movie: movie
		})
	})
})

// admin page
app.get('/admin/movie', function  (req, res) {
	res.render("admin",{
		title: 'immoc admin page',
		movie: {
			director: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			lang: '',
			flash: '',
			summary: ''
		}
	})
})

// admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id;
	console.log('updating ', id)

	if(id){
		Movie.findById(id, function(err,movie){
			res.render('admin',{
				title: 'imooc admin update page',
				movie: movie
			})
		})
	}
})
// admin post movie
app.post('/admin/movie/new', function(req,res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie
	if(id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie({
			director: movieObj.director,
			title: movieObj.title,
			country: movieObj.country,
			lang: movieObj.lang,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash,
		})
		_movie.save(function(err, movie){
			if(err){
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})

// index page
app.get('/admin/list', function  (req, res) {
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}

		res.render("list",{
			title: 'immoc list page',
			movies: movies
		});
	})

})

app.delete('/admin/list',function(req,res){

	var id = req.query.id
	console.log("deleting ", id)

	if(id){
		Movie.remove(id, function(err,movie){
			if(err){
				console.log(err)
			} else {
				res.json({success: 1})
			}
		})
	}
})