var express          = require("express"),
	mehodOverride    = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
    app              = express(),
    bodyParser       = require("body-parser"),
	mongoose         = require("mongoose"),
	flash   		 = require("connect-flash"),
	passport         = require("passport"),
	LocalStrategy    = require("passport-local"),
	Campground       = require("./models/campground"),
	Comment          = require("./models/comment"),
	User             = require("./models/user"),
	seedDB           = require("./seeds");

//requing routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");


 //mongoose.connect("mongodb://localhost:27017/yelp_camp_v11",{
 mongoose.connect("mongodb+srv://sabri:sabri@newcluster-8ybyt.mongodb.net/test?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true});
 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(mehodOverride("_method"));
app.use(flash());

// seedDB(); //seed the datebase

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I'm Super Vegeta",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//console.log(process.env.PORT, process.env.IP);
app.listen(process.env.PORT, process.env.IP, function () {
	console.log("Server has started...");
});