import { API_URL } from './config';
import axios from "axios";
import { getAccounts, getCookie, setCookie } from './util';


/*

			(accounts && accounts.map((e) => (<AccountInfo accountNumber={e.accountNumber}
			type={e.type}
			balance={e.balance} />)))}
			*/

export const AccountSelector = (props) => {
	const accounts = props.accounts;
//style={{width: "20em", margin: "1em"}}
//<div class="container">
	return (
			<select class="form-select" size="3" aria-label="size 3 select example" style={{width: "100%", margin: "1em auto"}}>
				{accounts && accounts.map((e) => (<option value={`#${e.accountNumber}`}>Account #{e.accountNumber}</option>))}
			</select>
	);
}



export const AccountInfo = (props) => {
	function handleClick(id) {
		console.log(`handleClick = ${id}`);
		setCookie('accountNumber', id, 7);
	}


	return (
		<div class="card" style={{width: "80%", margin: "1em"}}>
		<div class="card-header">Account #{props.accountNumber}</div>
		<div class="card-body">
			<h5 class="card-title">{props.type} account</h5>
			<p class="card-text">Balance: ${props.balance}</p>
			<a id={"account"+props.accountNumber}
				href="#/deposit"
				class="btn btn-primary"
				style={{margin: "auto 1em"}}
				onClick={(e) => handleClick(props.accountNumber)}>Deposit</a>
			<a id={"account"+props.accountNumber+"Withdraw"}
				href="#/withdraw"
				class="btn btn-primary"
				style={{margin: "auto 1em"}}
				onClick={(e) => handleClick(props.accountNumber)}>Withdrawal</a>
			<a id={"account"+props.accountNumber+"Transfer"}
				href="#/transfer"
				class="btn btn-primary"
				style={{margin: "auto 1em"}}
				onClick={(e) => handleClick(props.accountNumber)}>Transfer</a>
		</div>
	</div>
	);//
}


/*<div><p>Account Number = {props.accountNumber}</p></div>
</>*/
/*


}*/

	/*if(props.email != '') {
			getAccounts(props.email).map((e, i) => {
			console.log(`Account #${i}: ${e.accountNumber}`);
		});
	}*/

	//console.log(`accounts: ${JSON.stringify(props, null, 4)}`);
//export const ListAccounts = (props) => {
//http://localhost:3001/accounts/find/mametchi@rentalcorgis.com





//}