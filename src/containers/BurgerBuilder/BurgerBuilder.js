import React,{Component} from 'react';
import Au from '../../hoc/Au';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';


const INGREDIENT_PRICE ={
	salad : 0.5,
	bacon : 0.7,
	cheese : 0.4 ,
	meat : 1.3
}




class BurgerBuilder extends Component {
	state = {
			ingredients :{
				salad : 0,
				bacon :0,
				cheese : 0,
				meat :0
			},
			totalPrice : 4 ,
			purchasable : false,
			purchasing : false 

		}

	 updatePurchaseState(ingredients){
		const sum = Object.keys(ingredients)
		.map(igkey => {
			return ingredients[igkey];
	})
		.reduce((sum,el)=>{
			return sum + el; 
		},0);
		this.setState({purchasable : sum >0});

	}	

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount +1 ;
		const updatedIngredients = {
			...this.state.ingredients

		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice; 
		const additionalPrice = INGREDIENT_PRICE[type];
		const newPrice = oldPrice + additionalPrice ;
		this.setState({
			ingredients : updatedIngredients , totalPrice:newPrice
		})
		this.updatePurchaseState(updatedIngredients);


	}	

	removeIngredientHandler = (type)=> {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0){
			return;
		}
		const newCount = oldCount -1 ;
		const updatedIngredients = {
			...this.state.ingredients

		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice; 
		const deductionPrice = INGREDIENT_PRICE[type];
		const newPrice = oldPrice - deductionPrice ;
		this.setState({
			ingredients : updatedIngredients , totalPrice:newPrice
		})
		this.updatePurchaseState(updatedIngredients);
	

	}
	purchaseHandler = () => {
		this.setState({purchasing : true })
	}

	cancelOrderHandler=() => {
		this.setState({purchasing : false})
	}
	continueOrderHandler = () => {
		alert("Pls Continue !!! ");
	}


	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0			
		}
		return(
			<Au>
			<Modal show={this.state.purchasing} modalClosed ={this.cancelOrderHandler}>
			<OrderSummary 
			ingredients={this.state.ingredients}
			purchaseCanceled={this.cancelOrderHandler}
			purchaseContinue = {this.continueOrderHandler} 
			price={this.state.totalPrice} />
			</Modal>
			<Burger ingredients={this.state.ingredients} />
			<BuildControls 
			ingredientAdded={this.addIngredientHandler}
			ingredientRemoved ={this.removeIngredientHandler}
			disabled = {disabledInfo}
			price ={this.state.totalPrice}
			purchasable ={this.state.purchasable}
			ordered = {this.purchaseHandler}
			cancelOrder={this.cancelOrderHandler}
			 />
			
			</Au>

			);
	}
}


export default BurgerBuilder;