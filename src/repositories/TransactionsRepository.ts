import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateAppointmentDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getCashValue(): number {
    return this.transactions.reduce((totalSum, transaction): number => {
      if (transaction.type === 'income') return totalSum + transaction.value;

      return totalSum;
    }, 0);
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((totalSum, transaction): number => {
      if (transaction.type === 'income') return totalSum + transaction.value;

      return totalSum;
    }, 0);

    const outcome = this.transactions.reduce(
      (totalSum, transaction): number => {
        if (transaction.type === 'outcome') return totalSum + transaction.value;

        return totalSum;
      },
      0,
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateAppointmentDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
