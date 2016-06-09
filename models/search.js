//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var facility = function(options) {
  this.department = options.department;
  this.capacity = options.capacity;
 
};

//Class Function
facility.get = function(capacityNo, cb) {
  //這邊是當傳入一個memberId時，進入資料庫查出相對應的member資料
  db.select()
    .from('facility')
    .where({
      capacity : capacityNo
    })
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new facility(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}

//login
facility.getCapacity = function(capacityNo, cb) {
  db.select()
    .from('facility')
    .where({
     
      capacity : capacityNo,
      
    })
    .map(function(row) {
      return new facility(row);
    })
    .then(function(memberList) {
      if(memberList.length) { 
        cb(null, memberList[0]);
      } else {
        cb(new GeneralErrors.NotFound());
      }
    })
}




//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = facility;
