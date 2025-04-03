class Calculator{
    add=(a:number,b:number):number=>a+b;
    sub=(a:number,b:number):number=>a-b;
    mul=(a:number,b:number):number=>a*b;
    div=(a:number,b:number):number=>b!==0 ? a/b :NaN;
}
//Initialize calculator
const calc = new Calculator();
//Funtion to display results
function showResults(){
    const num1 = Number((document.getElementById("num1")as HTMLInputElement).value);
    const num2 = Number((document.getElementById("num2")as HTMLInputElement).value);
    (document.getElementById("addResult")as HTMLParagraphElement).textContent=`Addition:${calc.add(num1,num2)}`;
    (document.getElementById("subResult")as HTMLParagraphElement).textContent=`Subtraction:${calc.sub(num1,num2)}`;
    (document.getElementById("mulResult")as HTMLParagraphElement).textContent=`Multiplication:${calc.mul(num1,num2)}`;
    (document.getElementById("divResult")as HTMLParagraphElement).textContent=`Division:${calc.div(num1,num2)}`;
}
//Attach Fucntion to button
document.addEventListener("DOMContentLoaded",()=>{
    (document.getElementById("calculateBtn")as HTMLButtonElement).addEventListener("click",showResults);
});