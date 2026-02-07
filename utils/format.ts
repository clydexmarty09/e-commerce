//helper function to properly format currency 

export function formatMoney(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style:"currency", currency:"USD", 
    }).format(amount)
}