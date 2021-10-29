import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateOrUpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add' ) {
            return
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                })
            });
        }

    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailIdHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log("employee => " + JSON.stringify(employee));

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        }
        else {
            EmployeeService.updateEmployee(employee,this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
        
    }

    getTitle(){
        if(this.state.id === '_add' ){
            return <h3 className="text-center">Add Employee</h3>
        }
        else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    cancel() {
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <div className="container" style={{marginTop: "40px"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" >
                            <div style={{marginTop: "30px"}}>
                                  {
                                this.getTitle()
                                }   
                            </div>
                          
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Fist Name:</label>
                                        <input placeholder="John" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Smith" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Fist Name:</label>
                                        <input placeholder="example@outlook.com" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateOrUpdateEmployeeComponent;