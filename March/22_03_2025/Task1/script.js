var Calculator = /** @class */ (function () {
    function Calculator() {
        this.add = function (a, b) { return a + b; };
        this.sub = function (a, b) { return a - b; };
        this.mul = function (a, b) { return a * b; };
        this.div = function (a, b) { return b !== 0 ? a / b : NaN; };
    }
    return Calculator;
}());
//Initialize calculator
var calc = new Calculator();
//Funtion to display results
function showResults() {
    var num1 = Number(document.getElementById("num1").value);
    var num2 = Number(document.getElementById("num2").value);
    document.getElementById("addResult").textContent = "Addition:".concat(calc.add(num1, num2));
    document.getElementById("subResult").textContent = "Subtraction:".concat(calc.sub(num1, num2));
    document.getElementById("mulResult").textContent = "Multiplication:".concat(calc.mul(num1, num2));
    document.getElementById("divResult").textContent = "Division:".concat(calc.div(num1, num2));
}
//Attach Fucntion to button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", showResults);
});
