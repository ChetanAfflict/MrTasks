abstract class Plan {
    protected rate: number;

    constructor(rate: number) {
        this.rate = rate;
    }

    abstract getBill(units: number): number;
}

class ElectricityBill extends Plan {
    constructor() {
        super(5.5); // Example rate per unit
    }

    getBill(units: number): number {
        return units * this.rate;
    }
}

class WaterBill extends Plan {
    constructor() {
        super(2.0); // Example rate per unit
    }

    getBill(units: number): number {
        return units * this.rate;
    }
}

class InternetBill extends Plan {
    constructor() {
        super(10.0); // Example rate per unit
    }

    getBill(units: number): number {
        return units * this.rate;
    }
}

// Function to get plan instance based on selection
function getPlanInstance(planType: string): Plan {
    switch (planType) {
        case "electricity":
            return new ElectricityBill();
        case "water":
            return new WaterBill();
        case "internet":
            return new InternetBill();
        default:
            throw new Error("Invalid plan type selected");
    }
}

(window as any).getPlanInstance = getPlanInstance;
