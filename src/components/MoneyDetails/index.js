// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {eachDetail} = props
  const {displayText, amt, src, alt, testid} = eachDetail
  console.log({testid})
  return (
    <li className={`moneyItemContainer ${alt}`}>
      <img src={src} alt={alt} />
      <div className="">
        <p className="displayText">{displayText}</p>
        <p className="amt" data-testid={testid}>
          Rs {amt}
        </p>
      </div>
    </li>
  )
}
export default MoneyDetails
