import React, {useState} from "react";
const Calculator1=()=>{
    const[input,setInput]=useState("");
    const[result,setResult]=useState(null);

    const handleInput=(value)=>setInput((prev)=>prev+value);
    const clearInput=()=>{
        setInput("");
        setResult(null);
    };
    const calculateResult=()=>{
        try{
            setResult(eval(input));
        }catch{
            setResult("Error");
        }
    }
    return (
        <div>
            <h2>Basic Calculator</h2>
            <input data-testid="calc-input" type="text" value={input} readOnly />
            <div>
                {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", "C", "=", "/"].map((btn) => (
                    <button
                        key={btn}
                        data-testid={`btn-${btn}`}
                        onClick={() => (btn === "=" ? calculateResult() : btn === "C" ? clearInput() : handleInput(btn))}
                    >
                        {btn}
                    </button>
                ))}
            </div>
            {result !== null && <p data-testid="calc-result">Result: {result}</p>}
        </div>
    );
}

export default Calculator1;