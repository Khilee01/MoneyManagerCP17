import './index.css'

const TransactionItem = props => {
  const {eachTransaction, deleteTransaction} = props
  const {title, amount, transactionType, id} = eachTransaction
  const onClickDelete = () => {
    deleteTransaction(id)
  }
  return (
    <li className="transaction">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{transactionType}</p>
      <button data-testid="delete" onClick={onClickDelete} className="delete">
        <img
          className="deleteImg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
