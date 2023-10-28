import React from 'react'
//import { Switch, Route } from 'react-router-dom'
import { getCookie, isLoggedIn } from './util';

/*const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;*/
export const UserContext = React.createContext(isLoggedIn());//(getCookie('email')?true:false));
/*{
	authenticated: (getCookie('name')==null?false:true),
	setAuthenticated: (auth) => {}
});*/

export const Card = (props) => {
	function cardClasses() {
		return 'card bg-light mb-3';
	}
	
	
	function cardStyles() {
		var rs = {"minHeight": "425px",
				"width": (props.width?props.width:"50rem")};
				//style={{"minHeight": "400px", width: "22rem"}}>

		return rs;//"min-height: 400px; "+(props.width?("width: "+props+";"):"width: \"22rem\";");
	}		


	function headerColors() {
		//style={{"minHeight": "400px", width: "22rem"}}
		return props.headercolor ? ('card-header bg-'+props.headercolor+' text-white') : 'card-header';
	}


	function bodyColors() {
		//const bodyColor = props.bodycolor ? ('card-body bg-'+props.bodycolor+' text-black') : 'card-body';
		return props.bodycolor ? ('card-body bg-'+props.bodycolor+' text-black') : 'card-body';
	}

	return (
		<div className={cardClasses()} style={cardStyles()}>
			<h4 className={headerColors()}>{props.header}</h4>
			<div className={bodyColors()}>
				{props.title && (<h5 className="card-title">{props.title}</h5>)}
				{props.text && (<p className="card-text">{props.text}</p>)}
				{props.body}
				{props.status && (<div id='createStatus'>{props.status}</div>)}
			</div>
		</div>      
	);    
}

//export default Card