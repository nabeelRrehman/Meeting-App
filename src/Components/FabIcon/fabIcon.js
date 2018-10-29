import React, { Component } from 'react';
// import History from '../../History/History';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './fabIcon.css'
import History from '../../History/History'


library.add(faPlus)

class FabIcon extends Component {

    users() {
        const { users } = this.props
        users()
    }

    render() {
        return (
            <div>
                <nav className="container" onClick={() => this.users()} tooltip={'Set a Meeting'}>
                    {
                        <FontAwesomeIcon className='buttons' icon='plus' />
                    }
                </nav>
            </div>
        );
    }

}


export default FabIcon;