import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        })
    }

    addEmployee() {
        this.props.history.push("/add-employee/_add");
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        })
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    render() {
        return (
            <div>
                <br></br>
                <h2 className="text-center" >Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee} style={{ marginBottom: "10px" }}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered" style={{ border: "1.5px solid rgba(15, 15, 17, 0.61)" }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                <button onClick={() => this.deleteEmployee(employee.id)} style={{ marginLeft: "10px" }} className="btn btn-danger">Delete</button>
                                                <button onClick={() => this.viewEmployee(employee.id)} style={{ marginLeft: "10px" }} className="btn btn-info">Info</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;