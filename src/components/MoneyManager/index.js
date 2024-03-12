import React, {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    transactionType: 'Income',
    title: '',
    amount: 0,
    transactionsList: [],
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmtChange = event => {
    this.setState({
      amount: event.target.value,
    })
  }

  transactionTypeChange = event => {
    if (event.target.value === 'INCOME') {
      this.setState({transactionType: 'Income'})
    } else {
      this.setState({transactionType: 'Expenses'})
    }
  }

  onAdd = event => {
    event.preventDefault()
    const {title, amount, transactionType} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      transactionType,
    }

    if (transactionType === 'Income') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome + parseInt(amount),
        totalBalance: prevState.totalBalance + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses + parseInt(amount),
        totalBalance: prevState.totalBalance - parseInt(amount),
      }))
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
    }))
  }

  deleteTransaction = id => {
    const {transactionsList, totalExpenses, totalIncome} = this.state
    const deletedTransaction = transactionsList.find(
      transaction => transaction.id === id,
    )
    const newTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    // Update totalIncome and totalExpenses based on the deleted transaction
    const updatedTotalIncome =
      deletedTransaction.transactionType === 'Income'
        ? totalIncome - deletedTransaction.amount
        : totalIncome
    const updatedTotalExpenses =
      deletedTransaction.transactionType === 'Expenses'
        ? totalExpenses - deletedTransaction.amount
        : totalExpenses

    this.setState({
      transactionsList: newTransactionList,
      totalIncome: updatedTotalIncome,
      totalExpenses: updatedTotalExpenses,
      totalBalance: updatedTotalIncome - updatedTotalExpenses,
    })
  }

  render() {
    const {
      totalBalance,
      totalIncome,
      totalExpenses,
      transactionsList,
      title,
      amount,
    } = this.state
    const MoneyTypeOptions = [
      {
        id: uuidv4(),
        displayText: 'Your Balance',
        amt: totalBalance,
        src: 'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        alt: 'balance',
        testid: 'balanceAmount',
      },
      {
        id: uuidv4(),
        displayText: 'Your Income',
        amt: totalIncome,
        src: 'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        alt: 'income',
        testid: 'incomeAmount',
      },
      {
        id: uuidv4(),
        displayText: 'Your Expenses',
        amt: totalExpenses,
        src: 'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        alt: 'expenses',
        testid: 'expensesAmount',
      },
    ]

    return (
      <div className="pageContainer">
        <div className="Richard">
          <h1 className="name">Hi, Richard</h1>
          <p className="title">
            Welcome back to your<span> Money Manager</span>
          </p>
        </div>
        <ul className="moneyDetails">
          {MoneyTypeOptions.map(eachDetail => (
            <MoneyDetails eachDetail={eachDetail} key={eachDetail.id} />
          ))}
        </ul>
        <div className="transactionHistory">
          <form onSubmit={this.onAdd}>
            <h1>Add Transactions</h1>
            <label htmlFor="title">TITLE</label>
            <input
              value={title}
              placeholder="TITLE"
              id="title"
              onChange={this.onTitleChange}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              value={amount}
              placeholder="AMOUNT"
              id="amount"
              onChange={this.onAmtChange}
            />
            <label htmlFor="type">TYPE</label>
            <select id="type" onChange={this.transactionTypeChange}>
              {transactionTypeOptions.map(eachTransaction => (
                <option
                  value={eachTransaction.optionId}
                  key={eachTransaction.optionId}
                >
                  {eachTransaction.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
          <div className="historyRecord">
            <h1 className="historyHg">History</h1>
            <ul className="row">
              <li className="rowLine">
                <p className="subHg">Title</p>
                <p className="subHg">Amount</p>
                <p className="subHg">Type</p>
                <p> </p>
              </li>
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  eachTransaction={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
