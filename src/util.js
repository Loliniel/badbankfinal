import { API_URL } from './config';
import axios from "axios";



function getCookies() {
	var cookies = {};
	document.cookie.split(';').map((e) => {
		var c = e.split('=');
		return cookies[c[0].replace(/\s+/g, "").replace(/\s+$/g, "")] = decodeURI(c[1]).replace('%40', '@');
	});

	console.log(`cookies: ${JSON.stringify(cookies, null, 4)}`);

	return cookies;
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function printCookies() {
	const cookies = getCookies();
console.log(`${JSON.stringify(cookies, null, 4)}`);
	//cookies.map((e, i) => {
	//	console.log(`Cookie ${i}: ${e}`);

	//});
}


function isLoggedIn() {
	return (getCookie('name')!=null?true:false);
}


async function loginGoogleUser() {
	if(getCookie('login')!=='google') {
		console.log(`login cookie not set to google`);
		return;
	}

	const user = await getUserInfo(decodeURIComponent(getCookie('email')));
	eraseCookie('login');
	eraseCookie('email');

	//console.log(`in loginGoogleUser: user = ${JSON.stringify(user, null, 4)}`);
	if(user != null) {
		console.log(`Logging in Google user ${user.name}`);
		setCookie('name', user.name, 7);
		setCookie('email', user.email, 7);
		setCookie('id', user._id, 7);
		setCookie('accessLevel', user.accessLevel, 7);
	} else {
		console.log(`google user not in DB yet, adding now`);		
	}
}


async function getUserInfo(email) {
	console.log(`getUserInfo()`);
	if(typeof email != 'string') {
		console.log(`email is not a string`);
		return null;
	}
	//console.log(`looking for ${email}`);

	const user = await axios.get(API_URL + '/user/find/' + email)
	.then((res) => {
		//console.log(`inside axios call in getUserInfo: ${JSON.stringify(res.data, null, 4)}`);
		//console.log(`res.ok = ${res.data.ok}`);
		if (res.data.ok === true) {
			let auser = (({_id, name, email, accessLevel}) => ({_id, name, email, accessLevel}))(res.data.data);
			//console.log(`getUserInfo: ${JSON.stringify(auser, null, 4)}`);
			return auser;
			//return user;
		} else {
			return "";
		}
	});

	//console.log(`USER = ${JSON.stringify(user, null, 4)}`);
	return user;
}


async function getUserAccounts(email) {
	if(typeof email != 'string') {
		console.log(`getUserAccounts: email is not a string!`);
		return null;
	}

	console.log(`looking for accounts for ${email}`);
	const accounts = await axios.get(API_URL + '/accounts/user/' + email)
	.then((res) => {
		console.log(`inside axios call in getUserAccounts: ${JSON.stringify(res.data, null, 4)}`);
		console.log(`res.ok = ${res.data.ok}`);
		if (res.data.ok === true) {
			//let ret = res.data.data;//(({_id, name, email, accessLevel}) => ({_id, name, email, accessLevel}))(res.data.data);
			//console.log(`getUserInfo: ${JSON.stringify(auser, null, 4)}`);
			return res.data.data;
		} else {
			return null;// = "";
		}
	});

	console.log(`util.js account = ${accounts}`);
}


async function getAccounts(email) {
	console.log(`getAccounts: email = ${email}`);

	//if(email != null) {
		//var accounts = new Array;
		const results = await axios.get(API_URL+"/accounts/find/"+email)
			.then((res) => {
				console.log(`AccountInfo res.ok = ${res.data.ok}`);
				//console.log(`AccountInfo data = ${JSON.stringify(res.data, null, 4)}`);
				if(res.data.ok === true) {
					return res.data.data;
				} else {
					//console.log(`no accounts found`);
					return null;
				}
		})
		.catch((err) => {
			console.log(err);
		});
		//console.log(`type of results = ${JSON.stringify(results, null, 4)}`);
		return results;
	//}
}



export { getCookies, getCookie, setCookie, eraseCookie, printCookies, isLoggedIn, getUserInfo, loginGoogleUser, getUserAccounts, getAccounts }