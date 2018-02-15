import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

/**
 * Button to navigate home
 */
const NavHome = (props) => {

    return (
        <section>
        <Link to='/'>
            <Button bsStyle="primary" bsSize="small" className="navHome">
                <span className="glyphicon glyphicon-home"/>Home
            </Button>
        </Link>
        </section>
    )

};

export default NavHome;
