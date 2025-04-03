function calculateBill() {
    const billType = document.getElementById("billType").value;
    const units = parseFloat(document.getElementById("units").value);

    if (isNaN(units) || units < 0) {
        alert("Please enter a valid number of units.");
        return;
    }

    try {
        const planInstance = getPlanInstance(billType);
        const totalBill = planInstance.getBill(units);
        document.getElementById("result").innerText = `Total Bill: $${totalBill.toFixed(2)}`;
    } catch (error) {
        console.error(error.message);
        alert("Error calculating bill.");
    }
}
