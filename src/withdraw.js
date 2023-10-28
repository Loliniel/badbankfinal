import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Card, UserContext } from './context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCookie } from './util';
import { API_URL } from './config';
import axios from "axios";


const Withdraw = () => {
	const [withdrawAmount, setWithdrawAmount]       = React.useState(0);
	const [balance, setBalance]						= React.useState(0);
	const [showModal, setShowModal]					= React.useState(false);
	const [modalTitle, setModalTitle]				= React.useState("");
	const [modalText, setModalText]					= React.useState("");
	const [accountNumber, setAccountNumber]			= React.useState(() => {return getCookie('accountNumber')});
	const [depositButton, setDepositButton]			= React.useState(false);
	const [ account, setAccount ]					= React.useState({});

	React.useEffect(() => {
		const link = API_URL+"/accounts/info/"+accountNumber;
		console.log(`link = ${link}`);

		axios.get(API_URL+"/accounts/info/"+accountNumber)
				.then((res) => {
					console.log(`AccountInfo res.ok = ${res.data.ok}`);
					setAccount(res.data.data);
					if(res.data.ok == true) {
						console.log(`data = ${JSON.stringify(res.data.data, null, 4)}`);
					}
				});
			}, []);
	
	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});
	
	function handleWithdraw(event) {
		event.preventDefault();
		
		var amount = parseInt(document.getElementById("withdraw-amount").value);
		//parseInt(document.getElementById("withdraw-amount").value)
		console.log(`handleWithdraw: requesting withdraw of $${amount} from account #${account.accountNumber}.  Balance is $${account.balance}.`);

		if(isNaN(amount)) {
			console.log(`Withdraw Amount = ${amount}.  ${isNaN(amount)?" not number!":" is number!"}`);
			return false;
		}

		if(amount > account.balance) {
			console.log(`Error: amount is greater than balance.  Not enough funds.`);
			setModalTitle(`Deposit Failed!`);
			setModalText(`Error: amount of ${currencyFormat.format(amount)} is greater than balance of ${currencyFormat.format(account.balance)}.  Not enough funds.`);
			//`${currencyFormat.format(amount)} successfully deposited.`);
			setShowModal(true);

			return;
		}

		const withdrawLink = `${API_URL}/accounts/withdraw/${accountNumber}/${amount}`;
		console.log(`withdrawLink = ${withdrawLink}`);



		//call API for deposit
		axios.get(withdrawLink)
			.then((res) => {
				console.log(`deposit results = ${res.data.ok}`);
				return res;
			})
			.catch((err) => {
				return err;
			});

		//call API for updated account information
		axios.get(API_URL+"/accounts/info/"+accountNumber)
			.then((res) => {
				console.log(`AccountInfo res.ok = ${res.data.ok}`);
				setAccount(res.data.data);
				if(res.data.ok == true) {
					console.log(`data = ${JSON.stringify(res.data.data, null, 4)}`);
				}
			})
			.catch((err) => { return err; });
		

		console.log(`account after axios call ${JSON.stringify(account)}`);

		console.log(`withdraw amount = ${parseInt(document.getElementById("withdraw-amount").value)}`);
		setModalTitle(`Withdraw Successful!`);
		setModalText(`${currencyFormat.format(amount)} successfully withdrawn.`);
		setShowModal(true);
		//console.log(`deposit amount = ${parseInt(document.getElementById("deposit-amount").value)}`);
	}


  return (
  <>
		<Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header={accountNumber?"Withdraw "+account.type+" Account #"+accountNumber:"Withdraw"}
		body={(
		<>
		<h4><span className="float-left">Balance:</span><span className="float-right">{currencyFormat.format(account.balance)}</span></h4>
		<form className="position-absolute" style={{"bottom": "25px"}}>
			<label htmlFor="withdraw-amount" className="font-weight-bold">Withdraw Amount</label>
			<input type="input" className="form-control font-weight-bold" id="withdraw-amount" autoComplete="on" placeholder="$0.00" value={withdrawAmount} onChange={e => setWithdrawAmount()} /><br/>
			<button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
		</form>
		</>
		)}
		/>
		<Modal
		size="sm"
		show={showModal}
		onHide={() => setShowModal(false)}
		aria-labelledby="example-modal-sizes-title-sm"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
				{modalTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{modalText}</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setShowModal(false)} variant="secondary">
					Close
				</Button>
			</Modal.Footer>
		</Modal>
		</>
  )
}

export default Withdraw