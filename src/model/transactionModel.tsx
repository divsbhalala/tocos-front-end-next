interface TransactionApiResponse {
    error?: string;
    id: string;
    sender: UserApiResponse;
    receiver: UserApiResponse;
    amount: number;
}

interface TransactionApiRequest {
    senderId: string;
    receiverId: string;
    amount: number;
}
