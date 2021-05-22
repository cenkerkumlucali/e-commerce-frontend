export interface CustomerCreditCardDetails{
    cardId:number
    userId:number
    nameOnTheCard:string;
    cardNumber:string;
    cardCvv:string;
    expirationDate:string;
    moneyInTheCard?:number;
}