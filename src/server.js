const passWord = require("../data/password.js"); // Adjusted the path to navigate up one directory to the data folder

const express = require("express");
const app = express(); // Added missing const keyword
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const MongoClient = require("mongodb").MongoClient;
const url = `mongodb+srv://ljm8350:${passWord.mongoPassWord}@mongopractice.osgmeti.mongodb.net/?retryWrites=true&w=majority`; // Properly embedded passWord variable
var db;

MongoClient.connect(url, function (error, client) {
  if (error) {
    return console.log(error);
  }
  db = client.db("mongoPractice");
  app.listen(8080, function () {
    console.log("db connected");
  });
});

app.get("/", (_, res) => res.send("first Page"));

app.post("/add", function (req, res) {
  // 사실 여기는 이해가 안 됨 공부 더 하면 이해 될지도
  res.send("send Clear");
  console.log(req.body.title);
  console.log(req.body.date);
  var title = req.body.title;
  var date = req.body.date;

  db.collection("sample_airbnb.listingsAndReviews").findOne(
    { name: "Ocean View Waikiki Marina w/prkg" },
    function (error, result) {
      console.log(result.beds);
      var totalBed = result.beds; // 데이터의 접근 하는 방법

      db.collection("sample_airbnb.listingsAndReviews").insertOne(
        { id_: "123124", name: "home" },
        function (error, result) {
          console.log("save success"); // 데이터 추가하는 방법

          db.collection("counter").updateOne(
            { name: "방 개수" },
            { $inc: { totalBed: 1 } },
            function (error, result) {
              // $inc mongoDb함수로 1씩 증가시켜줌, 위에서 추가를 했기 때문에 전체 수를 추가해준것
              if (error) {
                return console.log(error);
              }
            }
          );
        }
      );
    }
  );
});

// ejs 불러오기
app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (error, result) {
      // post라는 collection에서 데이터 꺼내기
      console.log(error);
      console.log(result);
      res.render("index.ejs", { posts: result }); // 다음의 코드로 ejs파일에 데이터 넘겨주기
    });
});
