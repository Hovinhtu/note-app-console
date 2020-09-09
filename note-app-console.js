const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var arrayNote = [];
var stringNote = "";

// Hàm có chức năng Hiển thị tất cả các file
function showAllNote() {
  fs.readFile("note.txt", "utf8", function (err, data) {
    if (err) throw err;
    else if (data == "") console.log("Bạn chưa nhập ghi chú!");
    else console.log(data);
  });
  rl.close();
}

//Tạo ra một hàm có chức năng đọc file note vào một mảng
function readFileNote() {
  fs.readFile("note.txt", "utf8", function (err, data) {
    if (err) throw err;
    else arrayNote = data.split("\n");
  });
  console.log(arrayNote);
}
readFileNote();

function addANote() {
  rl.question("Mời bạn nhập ghi chú:", (ans) => {
    arrayNote.push("-" + ans);
    if (arrayNote[0] == "") arrayNote.shift(); // Dòng này lỗi là do một lỗi khó hiểu đố ai biết.
    stringNote = arrayNote.join("\n");
    fs.writeFile("note.txt", stringNote, "utf8", function (err) {
      if (err) throw err;
      else console.log("Ghi file thanh cong!");
    });
    rl.close();
  });
}

function changeANote() {
  //showAllNote();
  rl.question("Bạn muốn sửa ghi chú số mấy?", (ans) => {
    rl.question("Nội dung bạn muốn thay đổi?", (answer) => {
      arrayNote[ans - 1] = answer;
      stringNote = arrayNote.join("\n");
      fs.writeFile("note.txt", stringNote, "utf8", function (err) {
        if (err) throw err;
        else console.log("Ghi file thanh cong!");
      });
      console.log("Ghi chú hiện tại của bạn là: \n", stringNote);
      rl.close();
    });
  });
}

function deleteANote() {
  rl.question("Bạn muốn xóa ghi chú số mấy?", (ans) => {
    arrayNote.splice(ans - 1, 1);
    stringNote = arrayNote.join("\n");
    fs.writeFile("note.txt", stringNote, "utf8", function (err) {
      if (err) throw err;
      else console.log("Ghi file thanh cong!");
    });
    console.log("Ghi chú hiện tại của bạn là: \n", stringNote);
    rl.close();
  });
}

function menuBar(index) {
  switch (index) {
    case "0": {
      showAllNote();
      break;
    }
    case "1": {
      addANote();
      break;
    }
    case "2": {
      changeANote();
      break;
    }
    case "3": {
      deleteANote();
      break;
    }
  }
}

rl.question(
  "0.Hiển thị toàn bộ ghi chú \n1.Thêm một ghi chú mới \n2.Sửa một ghi chú \n3.Xóa bỏ một ghi chú \n Lựa chọn của bạn là:",
  (answer) => {
    menuBar(answer);
  }
);
