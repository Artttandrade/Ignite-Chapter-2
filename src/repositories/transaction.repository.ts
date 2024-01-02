import AsyncStorage from "@react-native-async-storage/async-storage";
import TransactionDTO from "../Interfaces/TransactionDTO";

const TRANSACTIONS_KEY = '@gofinances/transactions';

const TransactionRepository = {
    getAll: async () => {
        try {
            const transactionsString = await AsyncStorage.getItem(TRANSACTIONS_KEY);
            return transactionsString ? JSON.parse(transactionsString) : [];
        } catch (error) {
            console.error('Error getting transactions from AsyncStorage:', error);
            throw error;
        }
    },

    saveTransaction: async (transaction: TransactionDTO[]) => {
        try {
            await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transaction));
        } catch (error) {
            console.log('Error getting transactions from AsyncStorage:', error);
            throw error;
        }
    },

    removeAll: async () => {
        try {
            await AsyncStorage.removeItem(TRANSACTIONS_KEY);
        } catch (error) {
            throw error;
        }
    }
}

export default TransactionRepository;