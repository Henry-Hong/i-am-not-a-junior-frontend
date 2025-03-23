const foo = async () => {
  return 1;
};

const wrapper = (cb) => {
  return cb;
};

const wrapper2 = (cb) => {
  return (...args) => cb(...args);
};

const wrapper3 = (cb) => {
  return (...args) => {
    return cb(...args);
  };
};

const wrapper4 = (cb) => {
  return (...args) => {
    return cb(...args).then((ret) => ret);
  };
};

const wrapper5 = (cb) => {
  return (...args) => {
    return cb(...args)
      .then((ret) => ret)
      .then((ret) => ret)
      .then((ret) => ret);
  };
};

const wrapped = wrapper(foo);
const wrapped2 = wrapper2(foo);
const wrapped3 = wrapper3(foo);
const wrapped4 = wrapper4(foo);
const wrapped5 = wrapper5(foo);

wrapped().then((ret) => console.log(ret));
wrapped2().then((ret) => console.log(ret));
wrapped3().then((ret) => console.log(ret));
wrapped4().then((ret) => console.log(ret));
wrapped5().then((ret) => console.log(ret));
