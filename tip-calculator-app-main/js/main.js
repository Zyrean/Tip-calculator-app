"use strict";

const inputAll = document.querySelectorAll(".inp-reset");
const inputBandP = document.querySelectorAll(".inp");
const inputBill = document.querySelector(".input-bill");
const inputCustom = document.querySelector(".input-custom");
const inputPeople = document.querySelector(".input-people");

const labelErrorBill = document.querySelector(".label-error-bill");
const labelErrorPeople = document.querySelector(".label-error-people");
const labelTipAmount = document.querySelector(".total-tip");
const labelTotalAmount = document.querySelector(".total-bill");

const btnTips = document.querySelectorAll(".btn-tip");
const btnReset = document.querySelector(".btn-reset");
const btnConfirm = document.querySelector(".btn-confirm");

let percent = 0;
let isOk = false;

const hideError = function () {
  labelErrorBill.classList.add("hidden");
  labelErrorPeople.classList.add("hidden");
};

const displayError = function (ele, errorStr) {
  ele.classList.remove("hidden");
  ele.textContent = errorStr;
};

const displayBorder = (ele) =>
  (ele.style.outline = "2px solid rgb(225, 104, 49)");

const hideBorder = () =>
  inputBandP.forEach((ele) => (ele.style.outline = "none"));

const colorReset = () =>
  btnTips.forEach((btn) => (btn.style.backgroundColor = "hsl(183, 100%, 15%)"));

// Calculate tip per Person and total per Person
const calcTipAmount = function (bill = 0, tipPerc = 0, people = 0) {
  const tip = ((+bill / 100) * tipPerc).toFixed(2);
  const tipPerPerson = (tip / +people).toFixed(2);

  labelTipAmount.textContent = `$${
    isNaN(tipPerPerson) ? "0.00" : tipPerPerson
  }`;
  labelTotalAmount.textContent = `$${
    isNaN(((+bill + +tip) / +people).toFixed(2))
      ? "0.00"
      : ((+bill + +tip) / +people).toFixed(2)
  }`;
};

// Loops over "bill" and "people" input and calls error function if input is empty or NaN
const checkInputs = function () {
  inputBandP.forEach((inpF) => {
    if (!inpF.value) {
      displayError(
        document.querySelector(`.label-error-${inpF.id}`),
        "Can't be zero"
      );
      displayBorder(inpF);
    } else if (isNaN(inpF.value)) {
      displayError(
        document.querySelector(`.label-error-${inpF.id}`),
        "Numbers only"
      );
      displayBorder(inpF);
    }
  });
};

// Hides all errors and calls checkInputs func
const startCon = function () {
  hideError();
  hideBorder();
  checkInputs();
};

// Checks if custom-input is empty
// Loop over %-buttons and saves selected one
// If !custom-input takes it value as percent
const checkTipAmount = function () {
  if (!inputCustom.value) {
    btnTips.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        percent = e.target.dataset.percent;
      });
    });
    isOk = true;
  } else {
    percent = inputCustom.value;
    isOk = true;
  }
};

checkTipAmount();

// Resetting all inputs
const reset = function () {
  hideError();
  hideBorder();
  colorReset();
  inputAll.forEach((ele) => (ele.value = ""));
  labelTipAmount.textContent = `$0.00`;
  labelTotalAmount.textContent = `$0.00`;
  percent = 0;
};

// Looping over buttons and resetting background everytime button gets clicked
btnTips.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    colorReset();
    inputCustom.value = "";
    btn.style.backgroundColor = "hsl(185, 41%, 84%)";
  });
});

inputCustom.addEventListener("click", function () {
  colorReset();
});

btnConfirm.addEventListener("click", function () {
  console.log(percent);
  startCon();
  checkTipAmount();

  if (percent && inputBill.value && inputPeople.value) {
    calcTipAmount(inputBill.value, percent, inputPeople.value);
  }
});

btnReset.addEventListener("click", function () {
  reset();
});
