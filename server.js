const { mongoose } = require("mongoose"); // mongoose 모듈 불러오기

mongoose.connect(
  "mongodb+srv://ljm8350:<l0j1m188350!>@mongopractice.osgmeti.mongodb.net/?retryWrites=true&w=majority&appName=mongoPractice"
); // mongoDB에 연결

const db = mongoose.connection;

db.on("error", function () {
  // 연결 실패
  console.log("Connection Failed!");
});

db.once("open", function () {
  // 연결 성공
  console.log("Connected!");
});

const busStation = mongoose.Schema({
  // 스키마 생성
  number: "number",
  count: "number",
  driver: "string",
});

const BusStation = mongoose.model("Schema", busStation); // 스키마를 객체처럼 적용할 수 있게 만듬

const bus1 = new BusStation({// 새로운 객체를 만듬
  number: 1,
  count: 10,
  driver: "정민",
});

bus1.save(function (error, data) {// data를 저장
  if (error) {
    console.log(error);
  } else {
    console.log("Saved!");
  }
});



// 아이디에 대한 것을 실제 데이터를 넣어보며 확인해보기
// 10. BusStation 레퍼런스 전체 데이터 가져오기// 따로 다시 해보기 작성 해서
BusStation.find(function (error, students) {
  console.log("--- Read all ---");
  if (error) {
    console.log(error);
  } else {
    console.log(students);
  }
});

// 11. 특정 아이디값 가져오기
Student.findOne({ _id: "585b777f7e2315063457e4ac" }, function (error, student) {
  console.log("--- Read one ---");
  if (error) {
    console.log(error);
  } else {
    console.log(student);
  }
});

// 12. 특정아이디 수정하기
Student.findById(
  { _id: "585b777f7e2315063457e4ac" },
  function (error, student) {
    console.log("--- Update(PUT) ---");
    if (error) {
      console.log(error);
    } else {
      student.name = "--modified--";
      student.save(function (error, modified_student) {
        if (error) {
          console.log(error);
        } else {
          console.log(modified_student);
        }
      });
    }
  }
);

// 13. 삭제
Student.remove({ _id: "585b7c4371110029b0f584a2" }, function (error, output) {
  console.log("--- Delete ---");
  if (error) {
    console.log(error);
  }

  /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
        이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
        */
  console.log("--- deleted ---");
});
