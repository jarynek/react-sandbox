import React from 'react';
import ReactDom from 'react-dom';

import Form from './services/Form';
import User from './components/User';

import './../../assets/css/ui.css';

/**
 * HomepageController main js for homepage view
 */
class HomepageController extends React.Component {

    constructor(options) {
        super(options);

        this.state = {
            users: {
                list: options.users,
                edit: 'jarek'
            },
            basket: options.basket
        };

        new Form('form');
    }

    render() {
        return (
            <div>
                {ReactDom.createPortal(<User users={this.state.users}/>, document.getElementById('user'))}
            </div>
        )
    }
}

/**
 * Await until data is ready
 */
(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    ReactDom.render(<HomepageController
        users={users}
        basket={'basket'} />, document.getElementById('root'));
})();


