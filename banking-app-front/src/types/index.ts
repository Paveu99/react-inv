export interface UserEntity {
    id?: string,
    username: string,
    password: string,
    balance?: number,
}

export interface UserRegister {
    username: string,
    password: string,
    balance: number,
}

export type Investment = {
    id: string,
    sender_id: string,
    recipient_id: string,
    amount: number,
    timestamp: Date
}

export type Transfer = {
    amount: number,
    recipient: string
}

export type TransferResponse = {
    message: string,
    newTransaction: Investment,
}