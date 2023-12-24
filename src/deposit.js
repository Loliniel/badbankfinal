import React from 'react'
import { Card, UserContext } from './context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCookie } from './util';
import { API_URL } from './config';
import axios from "axios";


const Deposit = (props) => {
	const [depositAmount, setDepositAmount]       = React.useState(0);
	const [showModal, setShowModal]					= React.useState(false);
	const [modalTitle, setModalTitle]				= React.useState("");
	const [modalText, setModalText]					= React.useState("");
	const [accountNumber, setAccountNumber]			= React.useState(() => {return getCookie('accountNumber')});
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
	
	function handleDeposit(event) {
		event.preventDefault();
		var amount = parseInt(document.getElementById("deposit-amount").value);
		//parseInt(document.getElementById("deposit-amount").value)

		if(isNaN(amount)) {
			console.log(`Deposit Amount = ${amount}.  ${isNaN(amount)?" not number!":" is number!"}`);
			return false;
		}

		const depositLink = `${API_URL}/accounts/deposit/${accountNumber}/${amount}`;
		console.log(`depositLink = ${depositLink}`);

		//call API for deposit
		axios.get(depositLink)
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

		console.log(`deposit amount = ${parseInt(document.getElementById("deposit-amount").value)}`);
		setModalTitle(`Deposit Successful!`);
		setModalText(`${currencyFormat.format(amount)} successfully deposited.`);
		setShowModal(true);
	}

	return (
	<>
		<Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header={accountNumber?"Deposit "+account.type+" Account #"+accountNumber:"Deposit"}
		body={(
		<>
		<h4><span className="float-left">Balance:</span><span className="float-right">{currencyFormat.format(account.balance)}</span></h4>
		<form className="position-absolute" style={{"bottom": "25px"}}>
			<label htmlFor="deposit-amount" className="font-weight-bold">Deposit Amount</label>
			<input type="input" className="form-control font-weight-bold" id="deposit-amount" autoComplete="on" placeholder="$0.00" value={depositAmount} onChange={e => setDepositAmount()} /><br/>
			<button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
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

export default Deposit