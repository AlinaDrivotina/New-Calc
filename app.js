var currentNum = '';
var oldNum = '';
var archive = '';
var result = 0;
var newNum = false;
var lastEl = archive.slice(-1); // последний эл-т архива
var operator = '';
var signPressed = true;
var firstSign = true;

//переменные для цикла
var buttons = document.querySelectorAll('.buttons'),
    index, button;

//здесь навешиваю обработчики 
for (index = 0; index < buttons.length; index++) {
    button = buttons[index];
    button.addEventListener('click', numPressed);
    button.addEventListener('click', mathOperations);   
}

function numPressed(event) { // решить проблему со вторым числом
  if (!event.target.dataset.num) {
    return;
  }
  var length = document.getElementById('result').innerHTML.length;
  if (length > 11) {
    return;
  }
  var number = event.target.dataset.num;
  if (operator === '') {
    if (document.getElementById('result').innerHTML == "0") {
      document.getElementById('result').innerHTML = number;
      archive = document.getElementById('result').innerHTML;
      currentNum = number;            
    } else {
      document.getElementById('result').innerHTML += number;
      archive = document.getElementById('result').innerHTML;
      currentNum = document.getElementById('result').innerHTML;
    }
  }
  if (operator !== '' && signPressed) {
      document.getElementById('result').innerHTML = "";
      oldNum = currentNum;
      document.getElementById('result').innerHTML = number;
      currentNum = document.getElementById('result').innerHTML;
      signPressed = false;
    } else if (operator !== '') {
      document.getElementById('result').innerHTML += number;
      currentNum = document.getElementById('result').innerHTML;
  }
}


function decimal () {
  var currNum = document.getElementById("result").innerHTML;
  if (newNum) {
    document.getElementById("result").innerHTML = "0.";
    archive += document.getElementById("result").innerHTML;
    newNum = false;
  } else if (currNum.indexOf(".") == -1) {
      currNum += ".";
    }
  document.getElementById("result").innerHTML= currNum;
  currentNum = document.getElementById("result").innerHTML;
  archive += document.getElementById("result").innerHTML;
}
 document.getElementById("idDot").addEventListener('click', decimal);

function changeSign() {
  if (document.getElementById('result').innerHTML > 0) {
    document.getElementById('result').innerHTML *= -1;
    currentNum = document.getElementById('result').innerHTML
    archive = document.getElementById("result").innerHTML
  }
}
document.getElementById('idPM').addEventListener("click", changeSign);

function mathOperations(event) {// если будут больше чем 2 числа 
  if(!event.target.dataset.ops) {
    return;
  }
  var sign = event.target.dataset.ops; // проверить почему не работает
  if (firstSign === true && operator === '') {
    operator = sign;
    archive += sign;
    document.getElementById("archive").innerHTML = archive;
    firstSign = false;
  } else if (firstSign === false) {
    signPressed = true;
    var num1 = parseFloat(oldNum);
    var num2 = parseFloat(currentNum);
    switch(operator) {
      case '+': result = num1 + num2;break;
      case '-': result = num1 - num2;break; 
      case '*': result = num1 * num2;break; 
      case '/': result = num1 / num2;break;
    }
    operator = sign;
    archive += currentNum;
    document.getElementById("archive").innerHTML = archive;
    document.getElementById("result").innerHTML = '' + result;
    currentNum = '' + result;
    archive += sign;
    document.getElementById("archive").innerHTML = archive;
  } else if (operator !== '') {
     operator = sign;
      var newArch = archive.slice(0, -1);
      newArch += operator;
      archive = newArch;
      document.getElementById("archive").innerHTML = archive;
  }
}

function isEqual() { // если будут больше чем 2 числа 
  var num1 = parseFloat(oldNum);
  var num2 = parseFloat(currentNum);
  switch(operator) {
      case '+': result = num1 + num2;break;
      case '-': result = num1 - num2;break; 
      case '*': result = num1 * num2;break; 
      case '/': result = num1 / num2;break;
  }
  document.getElementById('result').innerHTML = result;
  document.getElementById('archive').innerHTML = 'Your result is';
}
document.getElementById('idEqual').addEventListener('click', isEqual);

function lastClear() {
  if (document.getElementById('result').innerHTML.length >= 2) {
    document.getElementById('result').innerHTML = document.getElementById('result').innerHTML.slice(0, -1);
    currentNum = document.getElementById('result').innerHTML;
    archive = document.getElementById('result').innerHTML;
  }
   else {
    document.getElementById('result').innerHTML = 0;
    currentNum = document.getElementById('result').innerHTML; 
    archive = document.getElementById('result').innerHTML;
  }
}
document.getElementById('idClear').addEventListener("click", lastClear);

function fullClear() {
  document.getElementById('result').innerHTML = '0';
  document.getElementById('archive').innerHTML = "Let's start";
  currentNum = '';
  oldNum = '';
  archive = '';
  newNum = false;
  lastEl = archive.slice(-1); 
  operator = '';
  signPressed = true;
  firstSign = true;
  result = 0;
}
document.getElementById('idC').addEventListener("click", fullClear);

function clear() {
  document.getElementById('result').innerHTML = '0';
  currentNum = document.getElementById('result').innerHTML;
}
document.getElementById('idCE').addEventListener("click", clear);





