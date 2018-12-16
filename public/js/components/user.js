import React from 'react';
import ReactDom from 'react-dom';
import UserForm from "./forms/user";
import Xhr from "../services/xhr";

/**
 * User react component
 */
class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: '',
            edit: {
                id: null,
                username: '',
                name: '',
                email: '',
                phone: ''
            },
            searchUser: '',
            searchInit: '',
        };

        this.xhr = new Xhr(this.props.users.list);
    }

    /**
     * _renderSearchInput
     * @returns {*}
     * @private
     */
    _renderSearchInput() {
        return (
            <div className={`search ${this.state.searchInit}`}>
                <label htmlFor="search" className="display-block">
                    <input placeholder="Search user" onChange={this._searchUser.bind(this)} type="text"
                           name="searchUser" defaultValue={this.state.searchUser}/>
                </label>
                <span onClick={this._searchReset.bind(this)} className="btn btn-xs reset">reset</span>
            </div>
        )
    }

    /**
     * _renderBtn
     * @param active
     * @returns {*}
     * @private
     */
    _renderBtn(active) {
        if (active) {
            return (
                <span onClick={this.saveUser.bind(this)} className="btn primary margin-lt-4">Save</span>
            )
        } else {
            return (
                <span onClick={this.setUser.bind(this)} className="btn margin-lt-4">Edit</span>
            )
        }
    }

    /**
     * render
     * @returns {*}
     */
    render() {
        return (
            <div>
                {this._renderSearchInput()}
                <div className="user-list">
                    <ul className="format">
                        {this.props.users.list.map((user) => {
                            let {id, username, name, email, phone, active = '', hidden = ''} = user;
                            return (
                                <li className={`list position-relative ${active} ${hidden}`} key={id} data-id={id}>
                                    <span className="display-block">{username} {name}</span>
                                    <span className="display-block">{email}</span>
                                    <span className="display-block">{phone}</span>
                                    {this._renderBtn(active)}
                                </li>
                            )
                        })}
                    </ul>

                    {ReactDom.createPortal(<UserForm
                        editUser={this.editUser.bind(this)}
                        edit={this.state.edit}/>, document.getElementById('user-form'))}
                </div>
            </div>
        )
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    /**
     *
     * @param {object} el
     * @returns {*}
     * @private
     */
    static _getUserId(el) {
        if (!el) {
            throw 'el is not forward';
        }
        return parseInt(el.dataset.id);
    }

    /**
     * searchUser
     * @param {object} el
     */
    _searchUser(el) {
        let search = this.props.users.list.filter((user) => {
            user.hidden = '';
            if (user.name.indexOf(el.target.value) === -1
                && user.username.indexOf(el.target.value) === -1) {
                user.hidden = 'hidden';
            }
        });

        this.setState({list: search});
        this.setState({searchInit: 'search-init'});
    }

    /**
     * _searchReset
     * @param {object} el
     * @private
     */
    _searchReset(el) {

        const node = ReactDom.findDOMNode(this);
        let input = node.querySelector('.search').childNodes[0].firstChild;
        input.value = '';

        this.props.users.list.map((user)=>{
            user.hidden = '';
        });

        this.setState({list: this});
    }

    /**
     * user param el
     * @param {object} el
     */
    setUser(el) {
        try {

            let edit = this.props.users.list.filter(user => user.id === User._getUserId(el.target.parentNode))[0];
            let actives = this.props.users.list.filter(user => user.active === 'active')[0];
            let active = this.state.active = 'active';

            if (actives) {
                actives.active = '';
            }
            edit.active = active;

            this.setState({edit: edit});

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * set Name
     * @param {object} el
     */
    editUser(el) {

        try {
            let label = el.target.parentNode;
            let object = this.props.users.list.filter(user => user.id === User._getUserId(label.parentNode))[0];
            object[el.target.name] = el.target.value;

            this.setState({object: this});
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * saveUser
     * @param {object} el
     */
    saveUser(el) {
        this.xhr.run();
    }
}

export default User