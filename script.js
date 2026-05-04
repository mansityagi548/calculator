const answer = document.querySelector(".calc-screen"); // this is where the screen you put
const num_key = document.querySelectorAll(".number-key"); // all the number keys
const operator_key = document.querySelectorAll(".operator-key"); // operator keys ;
const deleteBtn = document.querySelector(".del-btn");
const resetBtn = document.querySelector(".reset-btn");
const equalBtn = document.querySelector(".equal-btn");
const themes = document.querySelectorAll(".theme-toogle");

let current = "";
let previous = "";
let operation = null;
let showResetScreen = false;

num_key.forEach((num) => {
  num.addEventListener("click", () => {
    if (num.textContent === "." && current.includes(".")) return;

    if (showResetScreen) {
      current = "";
      showResetScreen = false;
    }

    current += num.textContent;

    if (previous !== "" && operation !== null) {
      answer.textContent = previous + operation + current;
    } else {
      answer.textContent = current;
    }
  });
});

operator_key.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (current === "" && previous === "") return;

    if (current !== "" && previous !== "" && operation !== null) {
      calculate();
    }

    previous = current || answer.textContent;
    operation = operator.textContent;
    current = "";
    answer.textContent = previous + "" + operation;
  });
});

deleteBtn.addEventListener("click", () => {
  const text = answer.textContent;
  const textChar = text.at(-1);
  if (operation != null && textChar === operation) {
    operation = null;
    answer.textContent = previous;
  } else if (previous !== "" && current === "") {
    previous = previous.slice(0, -1);
    answer.textContent = previous + operation + current;
  } else if (previous !== "" && current !== "") {
    current = current.slice(0, -1);
    answer.textContent = previous + operation + current;
  } else {
    current = current.slice(0, -1);
    answer.textContent = current || "0";
  }
});

resetBtn.addEventListener("click", () => {
  current = "";
  previous = "";
  operation = null;
  showResetScreen = false;
  answer.textContent = "0";
});

equalBtn.addEventListener("click", () => {
  if (current === "" || operation === null) return;
  calculate();
  showResetScreen = true;
});

function calculate() {
  let prev = parseFloat(previous);
  let curr = parseFloat(current);
  let result;

  if (operation === "+") result = prev + curr;
  if (operation === "-") result = prev - curr;
  if (operation === "x") result = prev * curr;
  if (operation === "/") {
    if (curr === 0) {
      answer.textContent = "Infinity";
      previous = "";
      current = "";
      operation = null;
      return;
    } else {
      result = prev / curr;
    }
  }

  result = parseFloat(result.toFixed(10));

  answer.textContent = result;
  current = result.toString();
  previous = "";
  operation = null;
}

function saveThemes() {
  let theme = localStorage.getItem("themeSwitch");
  if (theme === "lightTheme") {
    document.body.classList.add("theme-2");
    document.body.classList.remove("theme-3");
    document.querySelector("#theme2").checked = true;
  } else if (theme === "blueTheme") {
    document.body.classList.remove("theme-2");
    document.body.classList.add("theme-3");
    document.querySelector("#theme3").checked = true;
  } else {
    document.body.classList.remove("theme-2");
    document.body.classList.remove("theme-3");
   document.querySelector("#theme1").checked = true;
  }
}

saveThemes();

themes.forEach((theme, index) => {
  theme.addEventListener("click", (e) => {
    document.body.classList.remove("theme-2", "theme-3");

    if (index === 1) {
      document.body.classList.add("theme-2");
      localStorage.setItem("themeSwitch", "lightTheme");
    }
    if (index === 2) {
      document.body.classList.add("theme-3");
      localStorage.setItem("themeSwitch", "blueTheme");
    }

    if (index === 0) {
      localStorage.setItem("themeSwitch", "defaultTheme");
    }
  });
});
