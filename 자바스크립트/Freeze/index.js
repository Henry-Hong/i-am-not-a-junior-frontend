"use strict";

const obj = {
  apple: 1,
  banana: 2,
};

const frozenObj = Object.freeze(obj);

frozenObj.apple = 3;

console.log(frozenObj);
