import React from 'react';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {

        if(!this.props.edit.id) {
            return <h2>User is not selected</h2>
        }else{
            return (
                <div>
                    <h2>{this.props.edit.username} {this.props.edit.name}</h2>
                    <form data-id={this.props.edit.id}>
                        <label htmlFor="username" className="display-block margin-bt-10">
                            <span className="display-block label">username:</span>
                            <input onChange={this.props.editUser}
                                   type="text" name="username"
                                   value={this.props.edit.username}/></label>
                        <label htmlFor="name" className="display-block margin-bt-10">
                            <span className="display-block label">Name:</span>
                            <input onChange={this.props.editUser}
                                   type="text" name="name"
                                   value={this.props.edit.name}/></label>
                        <label htmlFor="email" className="display-block margin-bt-10">
                            <span className="display-block label">e-mail: </span>
                            <input onChange={this.props.editUser}
                                   type="text" name="email"
                                   value={this.props.edit.email}/></label>
                        <label htmlFor="phone" className="display-block margin-bt-10">
                            <span className="display-block label">phone: </span>
                            <input onChange={this.props.editUser}
                                   type="text" name="phone"
                                   value={this.props.edit.phone}/></label>
                    </form>
                    <div className="spinner">Saving...</div>
                </div>
            )
        }
    }
}

export default UserForm;