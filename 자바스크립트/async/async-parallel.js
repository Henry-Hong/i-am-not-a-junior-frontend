// const {parallel, series} = require("async")

function parallel(functions, callback){

  let isError = false;
  let counts = 0;
  let results = Array.from({length: functions.length}).fill(null);

  for(let i=0; i<functions.length; i++){
    const func = functions[i];
    // 도중에 실패하면 나머지들을 실행안시킬수도 있는걸까..
    func((err, result) => {
      results[i] = result;

      if(isError) return;

      if(err){
          isError = true;
          return callback(err, results);
      }
        counts += 1;
        if(counts >= functions.length){
          callback(null, results);
        }
    })
  }
}

const time_1 = 100 * 3;
const time_2 = 100 * 2;
const time_3 = 100 * 5;
const docTest = callback => {
  setTimeout(() => {
    const score = 10; // 점수
    const isPass = score >= 15; // 합격여부
    console.log(`1. docTest!`);
    callback(isPass ? null : 'fail from docTest!', score);
  }, time_1);
};

const techTest = callback => {
  setTimeout(() => {
    const score = 30; // 점수
    const isPass = score >= 30; // 합격여부
    console.log(`2. techTest!`);
    callback(isPass ? null : 'fail from techTest!', score);
  }, time_2);
};

const executiveTest = callback => {
  setTimeout(() => {
    const score = 10; // 점수
    const isPass = score >= 25; // 합격여부
    console.log(`3. executiveTest!`);
    callback(isPass ? null : 'fail from executiveTest!', score);
  }, time_3);
};

const recruit = () => {
  parallel([docTest, techTest, executiveTest], (err, result) => {
    // err ? console.log(`err : ${err}`) : console.log(result); // [21, 30, 33]
    console.log(err, result)
  });
};


recruit();