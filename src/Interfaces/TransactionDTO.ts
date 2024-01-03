export default interface TransactionDTO {
    id: string,
    name: string,
    amount: string,
    type: 'positive' | 'negative',
    category: string,
    date: Date
}