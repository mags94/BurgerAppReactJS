import React from 'react';
import Au from '../../hoc/Au';
import Button from '../UI/Button/Button';

const orderSummary =(props) => {
	const summary = Object.keys(props.ingredients)
	.map(igkey => {
		return(
			<li key={igkey}> 
			<span style={{textTransform:'capitalize'}}> {igkey}</span>: {props.ingredients[igkey]} 
			</li>

			); 
	});
return (
		<Au>
		<h3>Order summary</h3>
		<p> Burger is ready with the following ingredients </p>
		<ul>{summary} </ul>
		<p>proceed to checkout?</p>
		<p><strong>Total price : {props.price.toFixed(2)}</strong></p>
		<Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
		<Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
		</Au>

	);


	};
export default orderSummary;