import React ,{Component} from 'react';
import Au from '../../hoc/Au';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

	state={
		showSideDrawer: false

	};


	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	}

sideDrawerToggleHandler =() => {
	this.setState((prevState) => {
		return {showSideDrawer: !prevState.showSideDrawer}
	});
}

	render() {
		return(
		<Au>
			<Toolbar clicked={this.sideDrawerToggleHandler} />
			<SideDrawer open={this.state.showSideDrawer} closed ={this.sideDrawerClosedHandler}/>
			<main className={classes.Content}>
			{this.props.children}
			</main>
		</Au>


			);
	}
} 

export default Layout;