export type User = {
    id: string,
    username: string,
    password: string,
    balance: number
}

export type Investment = {
    id: string,
    senderId: string,
    recipientId: string,
    amount: number,
    timestamp: Date
}