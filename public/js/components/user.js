import React from 'react';
import ReactDom from 'react-dom';
import UserForm from "./forms/user";

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: '',
            edit:{
                name:''
            }
        };
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.users.list.map((user) => {
                        let {id, name, active=''} = user;
                        return (
                            <li className={`list ${active}`} key={id} data-id={id}>{name}
                                <span onClick={this.getUser.bind(this)} className="btn margin-lt-4">load</span>
                            </li>
                        )
                    })}
                </ul>

                {ReactDom.createPortal(<UserForm
                    setName={this.setNameTest.bind(this)}
                    edit={this.state.edit}/>, document.getElementById('user-form'))}
            </div>
        )
    }

    /**
     * user param el
     * @param {object} el
     */
    getUser(el){

        let id = parseInt(el.target.parentNode.dataset.id);
        let edit = this.props.users.list.filter(user => user.id === id)[0];
        let active = this.state.active === '' ? 'active' : '';

        edit.active = active;

        this.setState({active: active});
        this.setState({edit: edit});
    }

    /**
     * Edit name
     * @param {object} el
     */
    setName(el) {
        let id = parseInt(el.target.parentNode.dataset.id);
        let object = this.props.users.list.filter(user => user.id === id)[0];
        object.name = el.target.value;

        this.setState({object: this});
    }

    /**
     * set Name
     * @param {object} el
     */
    setNameTest(el){
        let label = el.target.parentNode;
        let id = parseInt(label.parentNode.dataset.id);
        let object = this.props.users.list.filter(user => user.id === id)[0];
        object.name = el.target.value;

        this.setState({object: this});
    }
}

export default User