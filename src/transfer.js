import { React, useContext, useState, setState, useEffect } from 'react';
import { Card, UserContext } from './context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCookie } from './util';
import { API_URL } from './config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AccountSelector } from './accounts';


const Transfer = () => {
	const [	transferAmount, setTransferAmount ]		= useState(0);
	const [	showModal, setShowModal ]				= useState(false);
	const [ modalTitle, setModalTitle ]				= useState("");
	const [ modalText, setModalText ]				= useState("");
	//const [ accountNumber, setAccountNumber]			= useState(() => {return getCookie('accountNumber')});
	//const [ transferButton, setTransferButton]		= useState(false);
	const [ accounts, setAccounts ]					= useState(null);

	const navigate = useNavigate();

	console.log(`transfer`);

	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});

	useEffect(() => {
		axios.get(API_URL+"/accounts/find/"+getCookie('email'))
				.then((res) => {
					console.log(`AccountInfo res.ok = ${res.data.ok}`);
					setAccounts(res.data.data);
					if(res.data.ok == true) {
						console.log(`data = ${JSON.stringify(res.data.data, null, 4)}`);
					}
				});
			}, []);


	function handleTransfer() {
		if(document.getElementById('origin-account').value == undefined) {
			console.log(`origin-account is undefined`);
			return;
		}

		if(document.getElementById('destination-account').value == undefined) {
			console.log(`destination-account is undefined`);
			return;
		}

		if(document.getElementById('origin-account').value === document.getElementById('destination-account').value) {
			console.log(`origin account and destination account are the same`);
			return;
		}

		if(transferAmount == 0) {
			console.log(`transferAmount is 0`);
			return;
		}

		const originAccount = Number(document.getElementById('origin-account').value);
		const destinationAccount = Number(document.getElementById('destination-account').value);

		const transferLink = `${API_URL}/accounts/transfer/${originAccount}/${destinationAccount}/${transferAmount}`;
		console.log(`transferLink = ${transferLink}`);

		//call API for deposit
		axios.get(transferLink)
			.then((res) => {
				console.log(`transfer results = ${res.data.ok}`);
				setModalTitle(`Transfer Successful!`);
				//setModalText(`hello`);//${currencyFormat.format(amount)} successfully deposited.`);
				setShowModal(true);
				return res;
			})
			.catch((err) => {
				return err;
			})

		return;
		//const originAccount = 
	}

	function handleAccountSelectionChange(e) {
		//origin-account / destination-account
		//origin-balance / destination-balance
		//if(e.currentTarget.value === "") return;

		if(e.currentTarget.getAttribute('id') === "origin-account") {
			console.log(`value = ${e.currentTarget.value}; typeof is ${typeof e.currentTarget.value}`);
			if(e.currentTarget.value === "") {
				document.getElementById('origin-balance').innerHTML = currencyFormat.format(Number(0));
				return;
			}
			var tempAccount = accounts.find(item => { return Number(item.accountNumber) === Number(e.currentTarget.value) });
			document.getElementById('origin-balance').innerHTML = currencyFormat.format(Number(tempAccount.balance));
			return;
		} else if(e.currentTarget.getAttribute('id') === "destination-account") {
			console.log(`value = ${e.currentTarget.value}; typeof is ${typeof e.currentTarget.value}`);
			if(e.currentTarget.value === "") {
				document.getElementById('destination-balance').innerHTML = currencyFormat.format(Number(0));
				return;
			}
			var tempAccount = accounts.find(item => { return Number(item.accountNumber) === Number(e.currentTarget.value) });
			document.getElementById('destination-balance').innerHTML = currencyFormat.format(Number(tempAccount.balance));
			return;
		}

		console.log(`account target = ${e.currentTarget.getAttribute("id")}; value = ${e.currentTarget.value}`);
	}

//style={{display: "block", float: "right"}}
  return (
  <>
  <div>hello</div>
  <Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header="Transfer between accounts"
		body={(
		<>
			<div class="row align-items-start">
				<div class="card" style={{width: "45%", margin: "auto", height: "400px"}}>
  					<div class="card-body">
    					<h5 class="card-title">Origin Account</h5>
						<div id="originContainer" class="container col">
							<select id="origin-account" class="form-select" size="3" aria-label="size 3 select example" style={{width: "100%", margin: "1em auto"}} onChange={e => handleAccountSelectionChange(e)}>
								<option value="">Select an account</option>
								{accounts && accounts.map((e) => (<option value={`${e.accountNumber}`}>Account #{e.accountNumber}</option>))}
							</select>
							<div id="originbalance-container" style={{display: "block", overflow: "hidden", marginBottom: "2em"}}>
								<span class="float-left mt-2 mr-2 font-weight-bold">Balance: </span>
								<span id="origin-balance" class="float-right mt-2 font-weight-bold">$0.00</span>
							</div>
							<div style={{display: "block"}}>
								<label htmlFor="transfer-amount" className="font-weight-bold">Transfer Amount</label>
								<input type="input" className="form-control font-weight-bold" id="transfer-amount" autoComplete="on" placeholder="$0.00" value={transferAmount} onChange={e => setTransferAmount(e.currentTarget.value)} /><br/>
								<button type="submit" className="btn btn-light" onClick={handleTransfer}>Transfer</button>
							</div>
						</div>
					</div>
				</div>
				<div class="card" style={{width: "45%", margin: "auto", height: "400px"}}>
					<div class="card-body">
    					<h5 class="card-title">Destination Account</h5>
						<div id="destinationContainer" class="container col">
							<select id="destination-account" class="form-select" size="3" aria-label="size 3 select example" style={{width: "100%", margin: "1em auto"}} onChange={e => handleAccountSelectionChange(e)}>
								<option value="">Select an account</option>
								{accounts && accounts.map((e) => (<option value={`${e.accountNumber}`}>Account #{e.accountNumber}</option>))}
							</select>
							<div id="destinationbalance-container" style={{display: "block", overflow: "hidden", marginBottom: "2em"}}>
								<span class="float-left mt-2 mr-2 font-weight-bold">Balance: </span>
								<span id="destination-balance" class="float-right mt-2 font-weight-bold">$0.00</span>
							</div>
						</div>
					</div>
				</div>
			</div>
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
				<Button onClick={() => {
					setShowModal(false);
					setTimeout(() => {
						console.log(`redirecting to main page ... `);
						navigate('/');
					}, 1500);
				}} variant="secondary">
					Close
				</Button>
			</Modal.Footer>
		</Modal>


		</>
  )
}

export default Transfer



/*<Card
headercolor="primary"
bodycolor="white"
bgcolor="primary"
header="Origin Account"
style={{width: "1eem", margin: "1em"}}
body={(
	<AccountSelector
		accounts={accounts}
	/>
)}
/>*/