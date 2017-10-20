var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
app.set("view engine", "ejs");
app.use("/styles",express.static(__dirname + "/styles"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

var itemSchema = new mongoose.Schema({
   "name": String,
   "image": String,
   "description": String
});

var Item = mongoose.model("Item", itemSchema);

// Item.create({
//     name: "ZOODLES & MEATBALLS",
//     image: "https://cdn.shopify.com/s/files/1/0972/6726/products/Zoodles_and_Meatballs_720x.png?v=1506016357",
//     description: "100% grass-fed beef meatballs over a bed of zucchini noodles, topped with paleo marinara sauce and fresh basil."
// }, function(err, newlyCreated){
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Success");
//     }
// });

app.get("/", function(req, res){
    Item.find({}, function(err, allItems){
        if(err){
            console.log(err);
        }else{
            res.render("menuPage", {items: allItems});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
});