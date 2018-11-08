import React from 'react';
import Classes from './Order.css';


const order= (props) => {
    let ingredient=[];
    console.log(props.ingredients);
    for(let ingredientName in props.ingredients){
        ingredient.push(
            {
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        }
        );
    }
    console.log(ingredient);
    const ingredientOutput = ingredient.map(ig=>{
        return <span   
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
        
        key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    console.log(ingredientOutput);

    return(
       
        <div className={Classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;