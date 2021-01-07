export function isPhone(val) {
  // let Pattern = /^1[34578]\d{9}$/;
  // let Pattern = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  let Pattern = /^1(2|3|4|5|7|8|9|6)\d{9}$/
  return Pattern.test(val)
}


// 是否都是中文
export function isChinaName(val) {
  var reg = /^[\u4e00-\u9fa5]+$/;
  var len = val.length;
  var flag = true;
  if (len < 1 || len > 9 || !reg.test(val)) {
    flag = false;
  }
  return flag;
}

export function isSnCode(val) {
  var reg = /^[\d]+$/;
  return reg.test(val);
}





// "^\\d+$"　　//非负整数（正整数 + 0）   
// "^[0-9]*[1-9][0-9]*$"　　//正整数   
// "^((-\\d+)|(0+))$"　　//非正整数（负整数 + 0）   
// "^-[0-9]*[1-9][0-9]*$"　　//负整数   
// "^-?\\d+$"　　　　//整数   
// "^\\d+(\\.\\d+)?$"　　//非负浮点数（正浮点数 + 0）   
// "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$"　　//正浮点数   
// "^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$"　　//非正浮点数（负浮点数 + 0）   
// "^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$"　　//负浮点数   
// "^(-?\\d+)(\\.\\d+)?$"　　//浮点数   
// "^[A-Za-z]+$"　　//由26个英文字母组成的字符串   
// "^[A-Z]+$"　　//由26个英文字母的大写组成的字符串   
// "^[a-z]+$"　　//由26个英文字母的小写组成的字符串   
// "^[A-Za-z0-9]+$"　　//由数字和26个英文字母组成的字符串   
// "^\\w+$"　　//由数字、26个英文字母或者下划线组成的字符串   
// "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$"　　　　//email地址   
// "^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$"　　//url   