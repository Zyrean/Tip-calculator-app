// Your users should be able to:

// - View the optimal layout for the app depending on their device's screen size
// - See hover states for all interactive elements on the page
// - Calculate the correct tip and total cost of the bill per person

"use strict";

const inputAll = document.querySelectorAll(".inp-reset");
const inputBandP = document.querySelectorAll(".inp");
const inputBill = document.querySelector(".input-bill");
const inputCustom = document.querySelector(".input-custom");
const inputPeople = document.querySelector(".input-people");

const labelErrorBill = document.querySelector(".label-error-bill");
const labelErrorPeople = document.querySelector(".label-error-people");

const btnTips = document.querySelectorAll(".btn-tip");

const tipAmount = document.querySelector(".total-tip");
const totalAmount = document.querySelector(".total-bill");

const btnReset = document.querySelector(".btn-reset");
const TESTBUTTON = document.querySelector(".img-logo");

let percent = 0;
let isOk = false;

// Calculate tip per Person and total per Person
const calcTipAmount = function (bill = 0, tipPerc = 0, people = 0) {
  const tip = ((+bill / 100) * tipPerc).toFixed(2);
  const tipPerPerson = (tip / +people).toFixed(2);

  tipAmount.textContent = `$${tipPerPerson}`;
  totalAmount.textContent = `$${((+bill + +tip) / +people).toFixed(2)}`;
};

const hideError = function () {
  labelErrorBill.classList.add("hidden");
  labelErrorPeople.classList.add("hidden");
};

const displayError = function (ele, errorStr) {
  ele.classList.remove("hidden");
  ele.textContent = errorStr;
};

const displayBorder = (ele) => (ele.style.outline = "2px solid rgb(225, 104, 49)");

const hideBorder = () => inputBandP.forEach((ele) => (ele.style.outline = "none"));

// Loops over "bill" and "people" input and calls error function if input is empty or NaN
const checkInputs = function () {
  inputBandP.forEach((inpF) => {
    if (!inpF.value) {
      displayError(document.querySelector(`.label-error-${inpF.id}`), "Can't be zero");
      displayBorder(inpF);
    } else if (isNaN(inpF.value)) {
      displayError(document.querySelector(`.label-error-${inpF.id}`), "Numbers only");
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
    btnTips.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        percent = e.target.dataset.percent;
      })
    );
    isOk = true;
  } else {
    percent = inputCustom.value;
    isOk = true;
  }
};

const reset = function () {
  hideError();
  hideBorder();
  inputAll.forEach((ele) => (ele.value = ""));
};

TESTBUTTON.addEventListener("click", function (e) {
  startCon();
  checkTipAmount();
  if (percent !== 0) calcTipAmount(inputBill.value, percent, inputPeople.value);
});

btnReset.addEventListener("click", function (e) {
  reset();
});
