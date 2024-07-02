import React, { createContext, useState, ReactNode } from "react";

interface Transaction {
  id: number;
  date: string;
  title: string;
  category: string;
  amount: number;
  status: string;
}

interface ExpenseContextType {
  transactions: Transaction[];
  addSubmittedOption: (transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
  editTransaction: (id: number) => Transaction | undefined;
  replaceTransaction: (transaction: Transaction) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addSubmittedOption = (transaction: Transaction) => {
    const updatedTransactions = [transaction, ...transactions];
    updatedTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setTransactions(updatedTransactions);
  };

  const replaceTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((t) => (t.id === transaction.id ? transaction : t))
    );
  };

  const removeTransaction = (id: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const editTransaction = (id: number) => {
    return transactions.find((transaction) => transaction.id === id);
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addSubmittedOption,
        removeTransaction,
        editTransaction,
        replaceTransaction,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = React.useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
