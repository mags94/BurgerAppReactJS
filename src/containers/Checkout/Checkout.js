import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{

	state={
		ingredients : null,
		totalprice : 0
	}

	componentWillMount(){
		
		const query = new URLSearchParams(this.props.location.search);

		const ingredients = {};
		let price=0;

		for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

		this.setState({
			ingredients : ingredients,
			totalprice : price
		});

		


	}
	cancelledHandler=()=>{

		this.props.history.goBack();


	}

	continuedHandler=()=>{
		this.props.history.replace('/checkout/contact-data');


	}


	render(){

		return(
			<div>				
				<CheckoutSummary 
				ingredients={this.state.ingredients}
				onCheckoutCancelled={this.cancelledHandler}
				onCheckoutContinued ={this.continuedHandler} /> 
				
				<Route path={this.props.match.path +'/contact-data' } 
				render={(props) => (<ContactData  ingredients={this.state.ingredients} price={this.state.totalprice} {...props}/>)}	/>			
			</div> 

			);
			
	}

}

export default Checkout;