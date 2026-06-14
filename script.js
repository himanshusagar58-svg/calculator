const display = document.querySelector(".calc_display")

// grab all buttons
const numbers = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero, .doublezero, .decimal")
const operators = document.querySelectorAll(".add, .subtract, .multiply, .divide")
const equal = document.querySelector(".equal")
const allErase = document.querySelector(".all_erase")
const erase = document.querySelector(".erase")
const percent = document.querySelector(".percent")
// state
let firstOperand = ""
let secondOperand = ""
let currentOperator = ""
let isNewNumber = false
// calculate function
function calculate(a, op, b) {
  a = parseFloat(a)
  b = parseFloat(b)
  if (op === "+") return a + b
  if (op === "-") return a - b
  if (op === "*") return a * b
  if (op === "/") {
    if (b === 0) return "Error"
    return a / b
  }
}
// number buttons
numbers.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent

    // prevent multiple decimals
    if (value === "." && display.textContent.includes(".")) return

    if (isNewNumber) {
      display.textContent = value
      isNewNumber = false
    } else {
      // prevent leading zeros
      if (display.textContent === "0" && value !== ".") {
        display.textContent = value
      } else {
        display.textContent += value
      }
    }
  })
})

// operator buttons
operators.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent

    if (firstOperand && currentOperator && !isNewNumber) {
      // chain calculation
      secondOperand = display.textContent
      const result = calculate(firstOperand, currentOperator, secondOperand)
      display.textContent = result
      firstOperand = String(result)
      secondOperand = ""
    } else {
      firstOperand = display.textContent
    }

    currentOperator = value
    isNewNumber = true
  })
})

// equal button
equal.addEventListener("click", () => {
  if (!firstOperand || !currentOperator) return

  secondOperand = display.textContent
  const result = calculate(firstOperand, currentOperator, secondOperand)
  display.textContent = parseFloat(result.toFixed(10))

  // reset for next calculation
  firstOperand = String(result)
  secondOperand = ""
  currentOperator = ""
  isNewNumber = true
})

// clear all
allErase.addEventListener("click", () => {
  display.textContent = "0"
  firstOperand = ""
  secondOperand = ""
  currentOperator = ""
  isNewNumber = false
})

// backspace — erase last character
erase.addEventListener("click", () => {
  if (display.textContent.length === 1) {
    display.textContent = "0"
  } else {
    display.textContent = display.textContent.slice(0, -1)
  }
})

// percent
percent.addEventListener("click", () => {
  if (display.textContent) {
    display.textContent = parseFloat(display.textContent) / 100
  }
})

// initialize display
display.textContent = "0"