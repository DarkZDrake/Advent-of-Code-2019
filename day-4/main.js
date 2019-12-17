const MIN = "152085";
const MAX = "670283";

let different_psw = [];
let possible_psw = [];

const temp_name = () => {
  for (let i = parseInt(MIN); i <= parseInt(MAX); i++) {
    let tmp = i.toString().slice();
    if (isNotDescending(tmp)) different_psw.push(i);
  }
  console.log(different_psw.length);
  different_psw.forEach(psw => {
    if (isNotInGroup(psw.toString())) {
      possible_psw.push(psw);
    }
  });
  console.log(possible_psw.length);
};

const isNotDescending = string => {
  let flag = false;

  for (let i = 0; i < string.length - 1; i++) {
    if (string.charAt(i) > string.charAt(i + 1)) return false;
    if (string.charAt(i) === string.charAt(i + 1)) flag = true;
  }

  return flag;
};

const isNotInGroup = string => {
  let flag = false;
  for (let i = 0; i < string.length - 1; i++) {
    if (
      string.charAt(i) === string.charAt(i + 1) &&
      string.charAt(i) !== string.charAt(i + 2) &&
      string.charAt(i) !== string.charAt(i - 1)
    ) {
      flag = true;
    }
  }
  return flag;
};

temp_name();
