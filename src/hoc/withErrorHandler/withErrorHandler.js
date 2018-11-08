import React,{Component} from 'react';
import Au from '../Au';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent,axios)=>{
	return class extends Component {

			state={
				error : null
			}

			componentWillMount(){
				axios.interceptors.request.use(req =>{
					this.setState({
						error : null
					});
					return req;
				})

				axios.interceptors.response.use(res => res,error =>{
					this.setState({
						error : error
					});
				})
			
			}

			errorConfirmHandler = ()=>{
				this.setState({
					error: null
				});
			}

			


		render(){

			return(
			<Au>
			<Modal show={this.state.error}
			modalClosed={this.errorConfirmHandler}>
			{this.state.error ? this.state.error.message : null }
			</Modal>
				<WrappedComponent {...this.props} />
			</Au>


		);
		}
	}
}

export default withErrorHandler;