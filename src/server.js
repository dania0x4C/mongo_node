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
  // ��� ����� ���ذ� �� �� ���� �� �ϸ� ���� ������
  res.send("send Clear");
  console.log(req.body.title);
  console.log(req.body.date);
  var title = req.body.title;
  var date = req.body.date;

  db.collection("sample_airbnb.listingsAndReviews").findOne(
    { name: "Ocean View Waikiki Marina w/prkg" },
    function (error, result) {
      console.log(result.beds);
      var totalBed = result.beds; // �������� ���� �ϴ� ���

      db.collection("sample_airbnb.listingsAndReviews").insertOne(
        { id_: "123124", name: "home" },
        function (error, result) {
          console.log("save success"); // ������ �߰��ϴ� ���

          db.collection("counter").updateOne(
            { name: "�� ����" },
            { $inc: { totalBed: 1 } },
            function (error, result) {
              // $inc mongoDb�Լ��� 1�� ����������, ������ �߰��� �߱� ������ ��ü ���� �߰����ذ�
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

// ejs �ҷ�����
app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (error, result) {
      // post��� collection���� ������ ������
      console.log(error);
      console.log(result);
      res.render("index.ejs", { posts: result }); // ������ �ڵ�� ejs���Ͽ� ������ �Ѱ��ֱ�
    });
});
