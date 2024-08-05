'use strict';
// global variable
const isEng = document.querySelector('html').lang === 'en';
const accountNum = Number(sessionStorage.getItem('num'));
const currDate = new Date();
const emptyMessage = `<div class="message flex-between"></div>`;
let sortFlag = true;
let currentAccount;
let product;
let num;
let data1;
let data2;
let newProduct;
// Data
const account1 = {
  userName: 'MT2001',
  owner: isEng ? 'Mohamed Tamer' : 'محمد تامر',
  movements: JSON.parse(localStorage.getItem('account1'))
    ? JSON.parse(localStorage.getItem('account1'))
    : [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  installment: JSON.parse(localStorage.getItem('accountInstallment1'))
    ? JSON.parse(localStorage.getItem('accountInstallment1'))
    : [],
};

const account2 = {
  userName: 'MT2004',
  owner: isEng ? 'Mostafa Tamer' : 'مصطفي تامر',
  movements: JSON.parse(localStorage.getItem('account2'))
    ? JSON.parse(localStorage.getItem('account2'))
    : [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  installment: JSON.parse(localStorage.getItem('accountInstallment2'))
    ? JSON.parse(localStorage.getItem('accountInstallment2'))
    : [],
};

const account3 = {
  userName: 'AT2000',
  owner: isEng ? 'Ahmed Tamer' : 'أحمد تامر',
  movements: JSON.parse(localStorage.getItem('account3'))
    ? JSON.parse(localStorage.getItem('account3'))
    : [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
  installment: JSON.parse(localStorage.getItem('accountInstallment3'))
    ? JSON.parse(localStorage.getItem('accountInstallment3'))
    : [],
};

const account4 = {
  userName: 'MA2001',
  owner: isEng ? 'Mohamed Ahmed' : 'محمد أحمد',
  movements: JSON.parse(localStorage.getItem('account4'))
    ? JSON.parse(localStorage.getItem('account1'))
    : [430, 1000, 700, 50, 90],
  pin: 4444,
  installment: JSON.parse(localStorage.getItem('accountInstallment4'))
    ? JSON.parse(localStorage.getItem('account4installment'))
    : [],
};

const accounts = JSON.parse(localStorage.getItem('accounts'))
  ? JSON.parse(localStorage.getItem('accounts'))
  : [account1, account2, account3, account4];
// Elements
const nameOfUserEl = document.querySelector('header .main-2 .language + div p');
const chooseLangBtnEl = document.querySelector('header .language .left i');
const ulLangListEL = document.querySelector('header .language .left ul');
const userEl = document.querySelector('form input[type="text"]');
const passWordEl = document.querySelector('form input[type="password"]');
const userMessageEl = document.querySelector('form #user + p');
const passMessageEl = document.querySelector("form input[type='password'] + p");
const arrowBtn = document.querySelector('.right a');
const currAmountEl = document.querySelector('div .amount');
const inAmountEl = document.querySelector('.footer .income p:first-child span');
const outAmountEl = document.querySelector(
  '.footer .income p:nth-child(2) span'
);
const installmentAmountEl = document.querySelector(
  '.footer .income p:nth-child(3) span'
);
const contMessageEl = document.querySelector(
  '.main-page .cont-main .transform'
);
const dateEl = document.querySelector('.container .main-page .head div p');
const logoutEl = document.querySelector('.sort + div p');
const accountReceiveEl = document.querySelector('.transfer');
const transferValueEl = document.querySelector('.transfer-amount');
const transferButton = document.querySelector('.transfer-button');
const transferMessageEl = document.querySelector('.transfer-message');
const transferAmountMessageEl = document.querySelector(
  '.transfer-amount-message'
);
const loanValueEl = document.querySelector('.loan-amount');
const loanButton = document.querySelector('.loan-button');
const loanMessageEl = document.querySelector('.loan-message');
const closeAccountUserEl = document.querySelector('.confirm-user');
const closeAccountUserMessageEl = document.querySelector('.message-user');
const closeAccountPinEl = document.querySelector('.confirm-pin');
const closeAccountPinMessageEl = document.querySelector('.message-pin');
const closeAccountButton = document.querySelector('.close-button');
const sortButton = document.querySelector('.sort-btn');
const installmentPageEl = document.querySelector('.list-card');
let applyButton;
const layoutBackgroundEl = document.querySelector('.layout');
const layoutInfoEl = document.querySelector('.layout-info');
const closeLayoutButton = document.querySelector('.close-layout');
const mainImageEl = document.querySelector('.main-photo');
const subImageEl = document.querySelectorAll('.photo');
const productNameEl = document.querySelector('.name-value');
const productWarrantyEl = document.querySelector('.warranty-value');
const productDescriptionEl = document.querySelector('.description-value');
const productModelEl = document.querySelector('.model-value');
const productCostEl = document.querySelectorAll('.select label span');
let selectPriceEl;
const allInputFieldEl = document.querySelectorAll('.select input');
const PurchaseButton = document.querySelector('.purchase');
const errorMessageEl = document.querySelector('.error');
const allCategoryButton = document.querySelector('.all-category');
const carCategoryButton = document.querySelector('.car-category');
const electronicCategoryButton = document.querySelector('.electronic-category');
const realEstateCategoryButton = document.querySelector('.realEstate-category');
const searchFieldEl = document.querySelector('.search form input');
const searchIconBtn = document.querySelector('.search form i');
const orderLoanMsgEl = document.querySelector('.order-Loan-msg');
const cancelButton = document.querySelector('.cancel');
const confirmButton = document.querySelector('.confirm');
const categoriesEl = document.querySelectorAll('.main-page .category p');
const currencyListEl = document.querySelector('.main-page .currency-cont');
// reset message
const resetMessage = function (element, EnglishMess, ArabicMess) {
  element.textContent = isEng ? EnglishMess : ArabicMess;
  element.style.color = 'black';
};
// Switch page function
const switchPage = function (currentPage, nextPage) {
  const str = window.location.href;
  window.location.href = str.includes(currentPage)
    ? str.replace(currentPage, nextPage)
    : `${str}${nextPage}`;
};
//login Function
const loginFunc = function (e) {
  e.preventDefault();
  const value = userEl.value;
  const pass = passWordEl.value;
  let flagU = false;
  let flagP = false;
  if (isEng) {
    userMessageEl.textContent = value
      ? 'Invalid username!'
      : 'Empty user field';
    passMessageEl.textContent = pass ? 'Invalid password!' : 'Empty pin field';
  } else {
    userMessageEl.textContent = value ? 'خطا في المستخدم' : 'حقل المستخدم فارغ';
    passMessageEl.textContent = pass
      ? 'خطا في كلمة المرور'
      : 'حقل كلمة المرور فارغ';
  }
  accounts.forEach(function (account, index) {
    if (value === account.userName) {
      flagU = true;
      if (Number(pass) === account.pin) {
        flagP = true;
        currentAccount = index;
        sessionStorage.setItem('num', `${index}`);
      }
    }
  });
  if (currentAccount !== undefined) {
    isEng
      ? switchPage('index.html', 'main-EN.html')
      : switchPage('indexAR.html', 'main-AR.html');
  } else if (!flagP && !flagU) {
    userMessageEl.classList.remove('hidden');
    passMessageEl.classList.remove('hidden');
  } else if (!flagP && flagU) {
    passMessageEl.classList.remove('hidden');
  } else if (!flagU && flagP) {
    userMessageEl.classList.remove('hidden');
  }
};
// global event
window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const str = window.location.href;
    str.includes('installment') ? searchMethod(e) : loginFunc(e);
  }
});
// remove invalid massage
const addHidden = function () {
  userMessageEl.classList.add('hidden');
  passMessageEl.classList.add('hidden');
};
// convert Number from English to Arabic
String.prototype.intoAr = function () {
  return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
};
// display main page
const displayMain = function () {
  dateEl.textContent = isEng
    ? `As oF ${currDate.getDate()}/${currDate.getMonth()}/${currDate.getFullYear()}`
    : `اعتبارا من ${currDate.getFullYear()}/${currDate.getMonth()}/${currDate.getDate()}`.intoAr();
  logoutEl.textContent = isEng
    ? `You will be logged out in ${currDate.getHours() - 12}:${
        currDate.getMinutes() < 10
          ? `0${currDate.getMinutes()}`
          : currDate.getMinutes()
      }`
    : `سيتم تسجيل خروجك ${currDate.getHours() - 12}:${
        currDate.getMinutes() < 10
          ? `0${currDate.getMinutes()}`
          : currDate.getMinutes()
      }`.intoAr();
};
// display and calc balance
const displayAndCalcBalance = function (movement) {
  contMessageEl.textContent = '';
  if (accounts[accountNum].installment.length > 0) {
    const myIns = `${accounts[accountNum].installment.reduce(
      (acc, ele) => acc + ele
    )}`;
    installmentAmountEl.textContent = isEng ? myIns : myIns.intoAr();
  } else {
    installmentAmountEl.textContent = isEng ? `0` : `0`.intoAr();
  }
  currAmountEl.textContent = isEng
    ? `${movement.reduce((acc, ele) => acc + ele)} L.E`
    : `${movement.reduce((acc, ele) => acc + ele)} ج.م`.intoAr();
  inAmountEl.textContent = isEng
    ? `${movement.filter(ele => ele > 0).reduce((acc, ele) => acc + ele)}`
    : `${movement
        .filter(ele => ele > 0)
        .reduce((acc, ele) => acc + ele)}`.intoAr();
  outAmountEl.textContent = isEng
    ? `${-1 * movement.filter(ele => ele < 0).reduce((acc, ele) => acc + ele)}`
    : `${
        -1 * movement.filter(ele => ele < 0).reduce((acc, ele) => acc + ele)
      }`.intoAr();
  nameOfUserEl.textContent = `${isEng ? 'Welcome' : 'مرحبا'} ${
    accounts[accountNum].owner
  }`;
  // display Transform
  movement.forEach((ele, i) => {
    const message = `<div class="message flex-between">
            <div class="flex-between">
              <i class="fa-solid fa-circle-info"></i>
              <div class="info ${isEng ? 'info-EN' : 'info-AR'} flex-between">
                <p>${
                  isEng ? 'Date : 23/07/2025' : 'التاريخ : 2025/07/23'.intoAr()
                }</p>
                <p>${
                  isEng ? 'time : 02:55 PM' : 'الوقت : 02:55 مساءا'.intoAr()
                }</p>
                <p>${
                  isEng
                    ? `Amount : ${Math.abs(ele)}`
                    : `الكمية : ${Math.abs(ele)}`.intoAr()
                }</p>
                <p>${
                  isEng
                    ? `Operation : ${ele > 0 ? 'Deposit' : 'Withdrawal'}`
                    : `العملية : ${ele > 0 ? 'أيداع' : 'سحب'}`
                }</p>
                <p>${isEng ? 'Operation Num' : 'كود العملية'} : xs${Math.trunc(
      Math.random() * 1000
    )}e</p>
              </div>
              <p class=${ele > 0 ? 'green-color' : 'red-color'}>${i + 1} ${
      ele > 0
        ? `${isEng ? 'DEPOSIT' : 'أيداع'}`
        : `${isEng ? 'WITHDRAWAL' : 'سحب'}`
    }</p>
            </div>
            <p>${isEng ? `${ele}L.E` : `${ele}ج.م`.intoAr()}</p>
          </div>`;
    contMessageEl.insertAdjacentHTML('afterbegin', message);
  });
  contMessageEl.insertAdjacentHTML('beforeend', emptyMessage);
};
// Transfer function
const transferMoney = function () {
  const receiver = accountReceiveEl.value;
  const amount = transferValueEl.value;
  const flagA =
    Number(amount) > 0 &&
    Number(amount) <=
      accounts[accountNum].movements.reduce((acc, mov) => acc + mov, 0);
  const flagU = accounts.some(acc => acc.userName === receiver);
  if (flagA && flagU) {
    accounts[accountNum].movements.push(-1 * Number(amount));
    const [anotherAccount] = accounts.filter(acc => acc.userName === receiver);
    const num = accounts.indexOf(anotherAccount);
    anotherAccount.movements.push(Number(amount));
    localStorage.setItem(
      `account${accountNum + 1}`,
      JSON.stringify(accounts[accountNum].movements)
    );
    localStorage.setItem(
      `account${num + 1}`,
      JSON.stringify(accounts[num].movements)
    );
    displayAndCalcBalance(accounts[accountNum].movements);
  } else if (flagA) {
    transferMessageLang(isEng, receiver);
  } else if (flagU) {
    transferAmountMessageLang(isEng, amount);
  } else {
    transferMessageLang(isEng, receiver);
    transferAmountMessageLang(isEng, amount);
  }
};
// Language Message
const transferAmountMessageLang = function (isEng, amount) {
  if (isEng) {
    transferAmountMessageEl.textContent = amount
      ? 'C.B. not enough'
      : 'Empty field!';
  } else {
    transferAmountMessageEl.textContent = amount
      ? 'رصيدك غير كافي'
      : 'حقل فارغ';
  }
  transferAmountMessageEl.style.color = 'red';
};
const transferMessageLang = function (isEng, receiver) {
  if (isEng) {
    transferMessageEl.textContent = receiver
      ? 'Invalid username'
      : 'Empty field!';
  } else {
    transferMessageEl.textContent = receiver ? 'خطا في المستخدم' : 'حقل فارغ';
  }
  transferMessageEl.style.color = 'red';
};
// rest transfer message
const resetTransferMessage = function () {
  resetMessage(transferAmountMessageEl, 'Amount', 'الكمية');
  resetMessage(transferMessageEl, 'Transfer to', 'تحويل الي');
};
// loan function
const requestLoan = function () {
  const value = loanValueEl.value;
  if (value && Number(value) > 0) {
    accounts[accountNum].movements.push(Number(value));
    localStorage.setItem(
      `account${accountNum + 1}`,
      JSON.stringify(accounts[accountNum].movements)
    );
    displayAndCalcBalance(accounts[accountNum].movements);
  } else {
    if (Number(value) === 0) {
      loanMessageEl.textContent = isEng ? 'Empty field!' : 'حقل فارغ';
    } else {
      loanMessageEl.textContent = isEng ? 'Invalid value' : 'قيمة غير مسموحه';
    }
    loanMessageEl.style.color = 'red';
  }
};
// reset loan message
const resetLoanMessage = function () {
  resetMessage(loanMessageEl, 'Amount', 'الكمية');
};
// close Account function
const closeAccount = function () {
  const user = closeAccountUserEl.value;
  const pin = closeAccountPinEl.value;
  const flagU = user === accounts[accountNum].userName;
  const flagP = Number(pin) === accounts[accountNum].pin;
  if (flagU && flagP) {
    accounts.splice(accountNum, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    isEng
      ? switchPage('main-EN.html', 'index.html')
      : switchPage('main-AR.html', 'indexAR.html');
  } else if (flagU) {
    closeAccountPinMessageError(pin);
  } else if (flagP) {
    closeAccountUserMessageError(user);
  } else {
    closeAccountPinMessageError(pin);
    closeAccountUserMessageError(user);
  }
};
const closeAccountPinMessageError = function (receiver) {
  if (isEng) {
    closeAccountPinMessageEl.textContent = receiver
      ? 'Invalid Pin'
      : 'Empty field!';
  } else {
    closeAccountPinMessageEl.textContent = receiver
      ? 'خطا في كلمة مرور'
      : 'حقل فارغ';
  }
  closeAccountPinMessageEl.style.color = 'red';
};
const closeAccountUserMessageError = function (receiver) {
  if (isEng) {
    closeAccountUserMessageEl.textContent = receiver
      ? 'Invalid user'
      : 'Empty field';
  } else {
    closeAccountUserMessageEl.textContent = receiver
      ? 'خطا في المستخدم'
      : 'حقل فارغ';
  }
  closeAccountUserMessageEl.style.color = 'red';
};
// reset close Account Message
const resetCloseAccountMessage = function () {
  resetMessage(closeAccountPinMessageEl, 'confirm Pin', 'تاكيد كلمة المرور');
  resetMessage(closeAccountUserMessageEl, 'confirm User', 'تاكيد المستخدم');
};
// sort function
const sortFun = function () {
  const newMovement = accounts[accountNum].movements.slice();
  sortFlag
    ? displayAndCalcBalance(newMovement.sort((a, b) => a - b))
    : displayAndCalcBalance(accounts[accountNum].movements);
  sortFlag = !sortFlag;
};
// handler event
if (chooseLangBtnEl) {
  chooseLangBtnEl.addEventListener('click', function () {
    ulLangListEL.classList.toggle('hidden');
  });
  document.addEventListener('click', function (e) {
    if (e.target !== chooseLangBtnEl) ulLangListEL.classList.add('hidden');
  });
}
// check User and password (login)
if (arrowBtn) {
  arrowBtn.addEventListener('click', function (e) {
    loginFunc(e);
  });
  // user message event handler
  userEl.addEventListener('input', addHidden);
  // password message event handler
  passWordEl.addEventListener('input', addHidden);
}
// display movement event handler
if (contMessageEl) {
  displayAndCalcBalance(accounts[accountNum].movements);
  displayMain;
  accountReceiveEl.addEventListener('input', resetTransferMessage);
  transferValueEl.addEventListener('input', resetTransferMessage);
  transferButton.addEventListener('click', transferMoney);
  // request loan event handler
  loanButton.addEventListener('click', requestLoan);
  loanValueEl.addEventListener('input', resetLoanMessage);
  // close account event handler
  closeAccountPinEl.addEventListener('input', resetCloseAccountMessage);
  closeAccountUserEl.addEventListener('input', resetCloseAccountMessage);
  closeAccountButton.addEventListener('click', closeAccount);
  // sort event handler
  sortButton.addEventListener('click', sortFun);
}
// display Installment function
const displayInstallment = function (product, filter) {
  installmentPageEl.textContent = '';
  newProduct = product.filter(ele =>
    filter
      ? ele.category === filter || ele.name.toLowerCase().includes(filter)
      : ele.category !== filter
  );
  newProduct.map((ele, index) => {
    const card = `<div class="card" id='${index}'>
            <div class="overflow">
              <img src=${ele.image[0]} />
            </div>
            <p class="name">${isEng ? `${ele.name}` : `${ele.name}`}</p>
            <p>${isEng ? 'Brand' : 'الماركة'} : ${ele.brand}</p>
            <p>${
              isEng
                ? `Warranty : ${ele.Warranty}`
                : `الضمان : ${ele.Warranty}`.intoAr()
            }</p>
            <p>${
              isEng
                ? `Price : ${ele.price[0]}L.E per month`
                : `السعر : ${ele.price[0]}ج.م في الشهر`.intoAr()
            }</p>
            <button class="apply-btn">${isEng ? 'Apply' : 'تقديم'}</button>`;
    installmentPageEl.insertAdjacentHTML('beforeend', card);
  });
  applyButton = document.querySelectorAll('.apply-btn');
  applyButton.forEach((ele, index) => {
    ele.addEventListener('click', function () {
      displayLayoutInfo(index, newProduct);
      num = index;
    });
  });
};
// fetch data
const injectProduct = function () {
  async function fetchJson() {
    try {
      const response = await fetch(
        isEng ? 'product-EN.json' : 'product-AR.json'
      );
      if (!response.ok) throw new Error('Network response was not ok ');
      product = await response.json();
      displayInstallment(product, '');
    } catch (err) {
      console.log(err);
    }
  }
  fetchJson();
};
// search method
const searchMethod = function (e) {
  e.preventDefault();
  const searchResult = searchFieldEl.value;
  displayInstallment(product, searchResult.toLowerCase());
  categoriesEl.forEach(ele => ele.classList.remove('orange-select'));
};
// display layout function
const displayLayoutInfo = function (num, data) {
  layoutBackgroundEl.style.display = 'block';
  layoutInfoEl.style.display = 'block';
  mainImageEl.src = data[num].image[0];
  subImageEl.forEach((ele, index) => {
    ele.src = data[num].image[index];
  });
  productNameEl.textContent = data[num].name;
  productWarrantyEl.textContent = isEng
    ? data[num].Warranty
    : `${data[num].Warranty}`.intoAr();
  productDescriptionEl.textContent = isEng
    ? data[num].description
    : `${data[num].description}`.intoAr();
  productModelEl.textContent = isEng
    ? data[num].model
    : `${data[num].model}`.intoAr();
  productCostEl.forEach((ele, index) => {
    ele.textContent = isEng
      ? data[num].price[index]
      : `${data[num].price[index]}`.intoAr();
  });
};
// remove Layout function
const removeLayout = function () {
  layoutBackgroundEl.style.display = 'none';
  layoutInfoEl.style.display = 'none';
  errorMessageEl.style.display = 'none';
  orderLoanMsgEl.style.display = 'none';
  allInputFieldEl.forEach(ele => (ele.checked = false));
  subImageEl.forEach(ele => ele.classList.remove('orange-select'));
  subImageEl[0].classList.add('orange-select');
};
// purchase method
const purchaseMethod = function (data, num) {
  selectPriceEl = document.querySelector('.select input:checked');
  if (selectPriceEl) {
    const yourAmount = accounts[accountNum].movements.reduce(
      (acc, ele) => acc + ele,
      0
    );
    const insAmount = data[num].price[Number(selectPriceEl.id - 1)];
    if (yourAmount >= insAmount) {
      accounts[accountNum].movements.push(-1 * insAmount);
      accounts[accountNum].installment.push(insAmount);
      localStorage.setItem(
        `account${accountNum + 1}`,
        JSON.stringify(accounts[accountNum].movements)
      );
      localStorage.setItem(
        `accountInstallment${accountNum + 1}`,
        JSON.stringify(accounts[accountNum].installment)
      );
      removeLayout();
    } else {
      orderLoanMsgEl.style.display = 'block';
      layoutInfoEl.style.display = 'none';
      allInputFieldEl.forEach(ele => (ele.checked = false));
    }
  } else {
    errorMessageEl.textContent = isEng
      ? 'You should select installment way'
      : 'يجب عليك اختيار طريقة تقسيط';
    errorMessageEl.style.display = 'block';
  }
};
// order loan method
const orderLoanMethod = function (product, num) {
  confirmButton.addEventListener('click', function () {
    accounts[accountNum].movements.push(
      product[num].price[selectPriceEl.id - 1]
    );
    accounts[accountNum].movements.push(
      -1 * product[num].price[selectPriceEl.id - 1]
    );
    accounts[accountNum].installment.push(
      product[num].price[selectPriceEl.id - 1]
    );
    localStorage.setItem(
      `account${accountNum + 1}`,
      JSON.stringify(accounts[accountNum].movements)
    );
    localStorage.setItem(
      `account${accountNum + 1}installment`,
      JSON.stringify(accounts[accountNum].installment)
    );
    removeLayout();
  });
};
// category choose method
const chooseCategory = function () {
  categoriesEl.forEach(ele => {
    ele.addEventListener('click', function () {
      categoriesEl.forEach(ele => ele.classList.remove('orange-select'));
      ele.classList.add('orange-select');
    });
  });
};
// Installment Page event handler
if (installmentPageEl) {
  chooseCategory();
  injectProduct();
  // all category event handler
  allCategoryButton.addEventListener('click', function () {
    displayInstallment(product, '');
    searchFieldEl.value = '';
  });
  // car category event handler
  carCategoryButton.addEventListener('click', function () {
    displayInstallment(product, 'car');
    searchFieldEl.value = '';
  });
  // electronic category event handler
  electronicCategoryButton.addEventListener('click', function () {
    displayInstallment(product, 'electronic');
    searchFieldEl.value = '';
  });
  // real estate category event handler
  realEstateCategoryButton.addEventListener('click', function () {
    displayInstallment(product, 'real estate');
    searchFieldEl.value = '';
  });
  // search icon event handler
  searchIconBtn.addEventListener('click', function (e) {
    searchMethod(e);
  });
  // remove layout event handler
  closeLayoutButton.addEventListener('click', removeLayout);
  layoutBackgroundEl.addEventListener('click', removeLayout);
  // change main image event handler
  subImageEl.forEach(ele => {
    subImageEl[0].classList.add('orange-select');
    ele.addEventListener('click', function () {
      subImageEl.forEach(ele => {
        ele.classList.remove('orange-select');
      });
      mainImageEl.src = ele.src;
      ele.classList.add('orange-select');
    });
  });
  // purchase button event handler
  PurchaseButton.addEventListener('click', function () {
    purchaseMethod(newProduct, num);
  });
  // cancel event handler
  cancelButton.addEventListener('click', removeLayout);
  // confirm event handler
  confirmButton.addEventListener('click', function () {
    orderLoanMethod(newProduct, num);
  });
}
// convert currency display
const displayCurrency = function (data) {
  currencyListEl.textContent = '';
  data.map(ele => {
    const currency = `<div class="flex-between">
            <p>
            <img src=${ele.photo} alt="" />
            ${isEng ? ele.type : ele.type.intoAr()}</p>
            <p>
              ${ele.country}
            </p>
            <p>${isEng ? `${ele.price} L.E` : `${ele.price} ج.م`.intoAr()}</p>
          </div>`;
    currencyListEl.insertAdjacentHTML('beforeend', currency);
  });
};
// function to fetch currency data
const injectCurrency = function () {
  async function fetchJsonForCurrency() {
    try {
      const response = await fetch(
        isEng ? 'currency-EN.json' : 'currency-AR.json'
      );
      if (!response.ok) throw new Error('Network response was not ok ');
      const currency = await response.json();
      displayCurrency(currency);
    } catch (err) {
      console.log(err);
    }
  }
  fetchJsonForCurrency();
};
// currency display
if (currencyListEl) injectCurrency();
