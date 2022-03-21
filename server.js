const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb");

var db;

MongoClient.connect(
  "mongodb+srv://dfinity:dfinity@cluster0.xtexu.mongodb.net/dfinity-cats?retryWrites=true&w=majority",
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("dfinity-cats");
    app.listen(process.env.PORT || 8000, () => {
      console.log("listening on 8000");
    });
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/wallet/:address", async (req, res) => {
  const walletAddress = req.params.address;
  if (
    walletAddress === undefined
  ) {
    res.status(400);
    res.json({ status: 400, error: "No Address Passed" });
  } else {
    const wallet = {
      walletAddress
    };
    const result = await db.collection("cats").insertOne(wallet);
    res.status(201);
    res.json({
      status: 201,
      message: `${walletAddress} inserted into record successfully`,
      raffleId: result.insertedId
    });
  }
});

app.get("/wallet/:address", async (req, res) => {
  try {
    let address = req.params.address;
    const result = await db.collection("cats").findOne({ walletAddress: address });
    if (result != null) {
      res.status(200);
      res.json({
        result,
      });
    } else {
      throw new Error("Invalid ID");
    }
  } catch (e) {
    res.status(400);
    res.json({
      status: 400,
      error: "Invalid ID",
    });
  }
})

app.get("/wallets", (req, res) => {
  db.collection("cats")
    .find()
    .toArray((err, result) => {
      if (err) return res.status(400).send(err);
      res.status(200);
      res.json({ wallets: result });
    });
});


// app.get("/cats", (req, res) => {
//   db.collection("cats")
//     .find()
//     .toArray((err, result) => {
//       if (err) return res.status(400).send(err);
//       res.status(200);
//       res.json({ cats: result });
//     });
// });

// app.get("/cats/:id", async (req, res) => {
//   try {
//     let objectId = new mongo.ObjectID(req.params.id);
//     const result = await db.collection("cats").findOne({ _id: objectId });
//     if (result != null) {
//       res.status(200);
//       res.json({
//         result,
//       });
//     } else {
//       throw new Error("Invalid ID");
//     }
//   } catch (e) {
//     res.status(400);
//     res.json({
//       status: 400,
//       error: "Invalid ID",
//     });
//   }
// });

// app.post("/cats", async (req, res) => {
//   const { catName, catColor, catBreed } = req.body;
//   if (
//     catName === undefined ||
//     catColor === undefined ||
//     catBreed == undefined
//   ) {
//     res.status(400);
//     res.json({ status: 400, error: "Invalid JSON body" });
//   } else {
//     const cat = {
//       catName,
//       catColor,
//       catBreed,
//     };
//     const result = await db.collection("cats").insertOne(cat);
//     res.status(201);
//     res.json({
//       status: 201,
//       message: `Cat inserted into record successfully with id: ${result.insertedId}`,
//       cat: { id: result.insertedId, catName, catBreed, catColor },
//     });
//   }
// });

// app.put("/cats/:id", (req, res) => {
//   let objectId = new mongo.ObjectID(req.params.id);
//   db.collection("cats").findOneAndUpdate(
//     { _id: objectId },
//     {
//       $set: {
//         catName: req.body.catName,
//         catColor: req.body.catColor,
//         catBreed: req.body.catBreed,
//       },
//     },
//     (err, result) => {
//       if (result.value == null) return res.send(err);
//       res.status(200);
//       res.json({
//         status: 200,
//         cat: {
//           catName: req.body.catName,
//           catColor: req.body.catColor,
//           catBreed: req.body.catBreed,
//         },
//       });
//     }
//   );
// });

// app.delete('/cats/:id', (req, res) => {
//   let objectId = new mongo.ObjectID(req.params.id);
//   db.collection('cats').findOneAndDelete({_id: objectId}, (err, result) => {
//     if (err || result.value == null) {
//       res.status(400)
//       res.json({
//         status: 400,
//         error: err ? err : 'Invalid ID' 
//       })
//     }
//     else{
//       res.status(200)
//       res.json({
//         status: 200
//       })
//     }
//   })
// })
