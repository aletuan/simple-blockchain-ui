export class Address {
    address: string;
    username: string;
    amount: number = 1000;

    constructor(username: string) {
        this.username = username;
        this.address = this.generateAddress();
    }

    private generateAddress(): string {
        return '0x' + Math.random().toString(36).substr(2, 40);
    }
    
    getShortAddress(): string {
        return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
    }    
    
    changeAmount(value: number): void {
        if (value > 0) {
            this.amount += value;
        } else if (value < 0) {
            if (this.amount + value >= 0) {
                this.amount += value;
            } else {
                throw new Error("Insufficient amount");
            }
        }
    }    
}