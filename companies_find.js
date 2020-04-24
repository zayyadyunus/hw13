const client = require('mongodb').MongoClient;
const url = "mongodb+srv://zayyadyunus:NusWorld01@cluster0-0tonn.mongodb.net/test?retryWrites=true&w=majority";

function find_company (str, mode) {
    client.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { console.log("Connection err: " + err); return; }
      
        var database  = db.db("Companies");
        var companies = database.collection('company');
        
        companies.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: " + err);
                return;
            } 
            else {
                for (i = 0; i < items.length; i++) {
                    if ((mode == "by_name" && str == items[i].company) || 
                        (mode == "by_ticker" && str == items[i].ticker)){
                        return "Found";
                    }
                    return "Not found";
                }
            }     	  
        });
    });
}
