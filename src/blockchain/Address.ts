export class Address {
    address: string;
    alias: string;
    balance: number = 1000;

    constructor(alias: string) {
        this.alias = alias;
        this.address = this.generateAddress();
    }

    private generateAddress(): string {
        return '0x' + Math.random().toString(36).substr(2, 40);
    }
    
    getShortAddress(): string {
        return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
    }    
    
    updateBalance(value: number): void {
        if (value > 0) {
            this.balance += value;
        } else if (value < 0) {
            if (this.balance + value >= 0) {
                this.balance += value;
            } else {
                throw new Error("Insufficient amount");
            }
        }
    }    
}