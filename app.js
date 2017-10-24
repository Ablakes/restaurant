var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
app.set("view engine", "ejs");
app.use("/styles",express.static(__dirname + "/styles"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/restaurant", {useMongoClient: true});

var itemSchema = new mongoose.Schema({
   "name": String,
   "image": String,
   "nutrition": String,
   "description": String
});

var Item = mongoose.model("Item", itemSchema);

app.get("/", function(req, res){
    res.redirect("/items");
});

// Item.create({
//     name: "ZOODLES & MEATBALLS",
//     image: "https://cdn.shopify.com/s/files/1/0972/6726/products/Zoodles_and_Meatballs_720x.png?v=1506016357",
//     description: "100% grass-fed beef meatballs over a bed of zucchini noodles, topped with paleo marinara sauce and fresh basil.",
//     nutrition: "https://cronometer.com/facts.html?food=3062125&measure=7988402&labelType=AMERICAN"
// }, function(err, newlyCreated){
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Success");
//     }
// }); 

// INDEX
app.get("/items", function(req, res){ 
    Item.find({}, function(err, allItems){
        if(err){
            console.log(err);
        }else{
            res.render("index", {items: allItems});
        }
    });
});

// NEW
app.get("/items/new", function(req, res){
   res.render("newItem"); 
});

// CREATE
app.post("/items", function(req, res){
   Item.create(req.body.item, function(err, newItem){
       if (err){
           console.log(err)
       }else{
           res.redirect("/items")
       }
   });
});

// SHOW
app.get("/items/:id", function(req, res){
   Item.findById(req.params.id, function(err, foundItem){
       if(err){
          console.log(err)
       }else{
           res.render("show", {item:foundItem});
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
});
