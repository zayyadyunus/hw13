const client = require('mongodb').MongoClient;
const url = "mongodb+srv://zayyadyunus:NusWorld01@cluster0-0tonn.mongodb.net/test?retryWrites=true&w=majority";
const fs = require('fs');

function main() {
    client.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) {
            return console.log("Error: Connecting to MongoDB.\n Details: " + err);
        }
        
        var database  = db.db("Companies");
        var companies = database.collection('company');

        /* Open .csv file and read data */
        fs.readFile('companies.csv', 'utf8', function (err, data){
            if (err) {
                return console.log("Error: Reading file.\n Details: " + err);
            }
            /* Split .csv file by newline occurences */
            var dataArray = data.split(/\r?\n/);

            /* Split each item in the array by comma appearances */
            for (i = 0; i < dataArray.length - 1; i++) {    /* Empty string at end of file */
                var newItem = dataArray[i].split(",");
                var newData = {"company": newItem[0], "ticker": newItem[1]};

                /* Insert data into database */
                companies.insertOne(newData, function(err, res) {
                    if (err) {
                        console.log("Error: Inserting document.\n Details: " + err);
                        return;
                    }
                    console.log("New document inserted.");
                });
            }
        });
        console.log("Success!");
    });
}

main();
