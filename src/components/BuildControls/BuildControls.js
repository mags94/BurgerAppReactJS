import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const control = [
{label:'Salad' , type:'salad'},
{label:'Cheese' , type:'cheese'},
{label:'Bacon' , type:'bacon'},
{label:'Meat' , type:'meat'}
]


const buildControls = (props) => (
	<div className={classes.BuildControls}>
	<p>current price : <strong>{props.price.toFixed(2)}</strong></p>
	{control.map(a => (
		<BuildControl 
		key={a.label} 
		label={a.label} 
		added={() => props.ingredientAdded(a.type)}
		removed ={() => props.ingredientRemoved(a.type)}
		disabled = {props.disabled[a.type]}

		/>
	) )}
	<button className={classes.OrderButton}
	disabled ={!props.purchasable}
	onClick={props.ordered}>ORDER NOW </button>

	</div>
	);



export default buildControls; 