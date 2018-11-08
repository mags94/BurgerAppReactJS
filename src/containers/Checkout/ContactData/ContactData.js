import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm :{
            name: {
                elementType :'input',
                elementConfig :{
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value :'',
            validation :{
                required : true
            },
            valid : false,
            touched :false
            },
            street :{
                elementType :'input',
                elementConfig :{
                    type : 'text',
                    placeholder : 'street'
                },
                value :'',
            validation :{
                required : true
            },
            valid : false,
            touched :false
            },
            country :{
                elementType :'input',
                elementConfig :{
                    type : 'text',
                    placeholder : 'country'
                },
                value :'',
            validation :{
                required : true
            },
            valid : false,
            touched :false

            },
            zipCode :{
                elementType :'input',
                elementConfig :{
                    type : 'text',
                    placeholder : 'zipCode'
                },
                value :'',
            validation :{
                required : true,
                minlength :5,
                maxlength :8
            },
            valid : false,
            touched :false

            },
            email :{
                elementType : 'input',
                elementConfig :{
                    type : 'email',
                    placeholder : 'email'
                },
                value :'' ,
            validation :{
                required : true
            },
            valid : false,
            touched :false              

            },
            deleiveryMethod :{
                elementType : 'select',
                elementConfig :{
                   options : [
                       { value :'fastest' , displayValue : 'fastest'},
                       {value :'cheapest',  displayValue : 'cheapest'}
                   ]
                },
                           
               
                value :'fastest'  ,
                validation :{},  
                valid : true 
                

            }

        }, 
        FormIsValid : false ,        
        loading: false
        

    };

    CheckValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }


        if(rules.required){
            isValid = value.trim() !== '' ;

        }
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid
        }
        if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid
        }
        
        return isValid;

    }

    OrderHandler=(event)=>{
        event.preventDefault();     
        this.setState({loading : true});
        let  formData={};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        console.log(formData);
        console.log(this.props.ingredients);
       
        const order = {
            ingredient: this.props.ingredients,           
            price: this.props.price,
           OrderData : formData
        }

		
		axios.post('/orders.json',order)
		.then(response => {
            this.setState({loading:false});
            this.props.history.push('/');
            
		})
		.catch(error => 
			{this.setState({loading:false})
			});        


    }
    inputChangedHandler=(event,inputIdentifier)=>{
       
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedformElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedformElement.value = event.target.value ;
        updatedformElement.touched = true;
        updatedOrderForm[inputIdentifier]= updatedformElement;
        updatedOrderForm[inputIdentifier].valid = this.CheckValidity(updatedformElement.value , updatedOrderForm[inputIdentifier].validation);
        
        let formIsValid = true;
        for (let InputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[InputIdentifier].valid && formIsValid
        }
        this.setState({
            orderForm : updatedOrderForm,
            FormIsValid : formIsValid
        });

    }


render(){
    const formElementArray =[];
    for(let key in this.state.orderForm){
        formElementArray.push({
            id : key,
            config : this.state.orderForm[key]
        });

    }

    let form=(
        <form onSubmit={this.OrderHandler}>        
            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                 elementType={formElement.config.elementType} 
                elementConfig = {formElement.config.elementConfig}
                value={formElement.value}
                invalid ={!formElement.config.valid}
                required ={formElement.config.validation}
                touched = {formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.FormIsValid}>ORDER</Button>
        </form>
        );
    if(this.state.loading){
        form=<Spinner />
    }


    return(
        <div className={Classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}

        </div>

    );



}

}
export default ContactData;