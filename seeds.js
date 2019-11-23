var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://live.staticflickr.com/3699/10408084336_fa4dcd34aa_b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa ultricies mi quis hendrerit. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Quis imperdiet massa tincidunt nunc pulvinar. Eros donec ac odio tempor. Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Eros in cursus turpis massa tincidunt dui. Morbi tristique senectus et netus et malesuada fames ac turpis. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Eu ultrices vitae auctor eu. Quis blandit turpis cursus in hac habitasse. Amet aliquam id diam maecenas ultricies mi eget."
    },
    {
        name: "Clouds Resting",
        image: "https://live.staticflickr.com/3670/12659674335_d2e35827b0_b.jpg",
        description: "Facilisis gravida neque convallis a. Id semper risus in hendrerit gravida rutrum quisque non tellus. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Facilisis magna etiam tempor orci eu lobortis elementum. Et malesuada fames ac turpis egestas. Fermentum dui faucibus in ornare quam viverra orci. Magna fringilla urna porttitor rhoncus dolor. Morbi tristique senectus et netus et malesuada fames ac turpis. Congue quisque egestas diam in. Egestas purus viverra accumsan in nisl nisi scelerisque. Mauris cursus mattis molestie a iaculis at. At ultrices mi tempus imperdiet nulla malesuada. Vulputate mi sit amet mauris commodo quis imperdiet massa."
    },
    {
        name: "Clouds Restful",
        image: "https://live.staticflickr.com/3722/12679904415_0db8bfdd2e_b.jpg",
        description: "Non arcu risus quis varius. Est placerat in egestas erat imperdiet sed. A scelerisque purus semper eget duis at. Cursus metus aliquam eleifend mi in nulla. Morbi tincidunt augue interdum velit euismod in pellentesque. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Massa vitae tortor condimentum lacinia quis vel eros donec. Tempor orci eu lobortis elementum nibh. Non consectetur a erat nam. Varius vel pharetra vel turpis. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Pretium quam vulputate dignissim suspendisse in. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!!!");
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err ,comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });

    //add a few comments
}

module.exports = seedDB;