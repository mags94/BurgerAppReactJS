import React,{Component} from 'react';
import Au from '../../hoc/Au';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const INGREDIENT_PRICE ={
	salad : 0.5,
	bacon : 0.7,
	cheese : 0.4 ,
	meat : 1.3
}




class BurgerBuilder extends Component {
	state = {
			ingredients : null,
			totalPrice : 4 ,
			purchasable : false,
			purchasing : false,
			loading : false,
			error : false


		}

		componentDidMount(){

			axios.get('https://react-my-burger-1c0f9.firebaseio.com/ingredients.json')
			.then(response=>{
				this.setState({
					ingredients : response.data
				});

			})
			.catch(error =>{this.setState({
				error : true
			})})
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
		const queryParams=[];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString= queryParams.join('&');
		this.props.history.push({
			pathname : '/checkout',
			search : '?' + queryString

			});	

	}


	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0			
		}
		 
			
		let burger =this.state.error ? <p>Ingredients not able to load </p> : <Spinner />;
		let orderSummary = null;
		if(this.state.ingredients)
		{
		burger =(
		<Au>
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
			 orderSummary = <OrderSummary 
			ingredients={this.state.ingredients}
			purchaseCanceled={this.cancelOrderHandler}
			purchaseContinue = {this.continueOrderHandler} 
			price={this.state.totalPrice} />
		}
		if(this.state.loading){
				orderSummary = <Spinner />
			}
		return(
			<Au>
			<Modal show={this.state.purchasing} modalClosed ={this.cancelOrderHandler}>
			{orderSummary}
			</Modal>
			{burger}
			
			</Au>

			);
	}
}


export default withErrorHandler(BurgerBuilder,axios);