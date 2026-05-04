// const {series} = require("async")

function series(functions, callback){

  let results = [];

  function dfs(index, functions){

    if(index === functions.length) {
      callback(null, results);
      return;
    };

    const func = functions[index];
    func((err, result) => {
      if(err){
        callback(err, result ? [...results, result] : results);
        return;
      }
      results.push(result);
      dfs(index + 1, functions);
    });

  }

  dfs(0, functions);
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
    const score = 20; // 점수
    const isPass = score >= 30; // 합격여부
    console.log(`2. techTest!`);
    callback(isPass ? null : 'fail from techTest!', score);
  }, time_2);
};

const executiveTest = callback => {
  setTimeout(() => {
    const score = 30; // 점수
    const isPass = score >= 25; // 합격여부
    console.log(`3. executiveTest!`);
    callback(isPass ? null : 'fail from executiveTest!', score);
  }, time_3);
};

const recruit = () => {
  series([docTest, techTest, executiveTest], (err, result) => {
    // err ? console.log(`err : ${err}`) : console.log(result); // [21, 30, 33]
    console.log(err, result)
  });
};


recruit();