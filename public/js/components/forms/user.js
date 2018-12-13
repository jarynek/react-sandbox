import React from 'react';

class UserForm extends React.Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <div>
                <h2>{this.props.edit.name}</h2>
                <form data-id={this.props.edit.id}>
                    <label htmlFor="name"><input onChange={this.props.setName}
                                                 type="text" name="name"
                                                 value={this.props.edit.name}/></label>
                </form>
            </div>

        )
    }
}

export default UserForm;