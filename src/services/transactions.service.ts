import TransactionDTO from "../Interfaces/TransactionDTO";
import TransactionRepository from "../repositories/transaction.repository";

const TransactionsService = {
    getAllTransactions: async (): Promise<TransactionDTO[]> => {
        try {
            return await TransactionRepository.getAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    addTransaction: async (transaction: TransactionDTO) => {
        try {
            const currentTransactions = await TransactionRepository.getAll();
            const updatedTransactions = [...currentTransactions, transaction];
            await TransactionRepository.saveTransaction(updatedTransactions);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    removeAll: async () => {
        try {
            TransactionRepository.removeAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default TransactionsService;