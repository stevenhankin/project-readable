import React, {Component} from 'react';
import {fetchCategories} from '../../../services/api.js';
import {Link, withRouter} from 'react-router-dom';
import {Button,Nav , Navbar,NavItem} from 'react-bootstrap';
import {getCategories} from "./actions";
import {connect} from "react-redux";


class CategoryNav extends Component {
    constructor(props) {
        super(props);

        this.props.getCategories();
    }


    render() {
        // return (
        //     <Navbar>
        //         <Navbar.Header>
        //             <Navbar.Brand>
        //                 <a href="#home">Categories</a>
        //             </Navbar.Brand>
        //         </Navbar.Header>
        //         <Nav>
        //         {this.props.categories && this.props.categories.map(val =>
        //             <Link key={val.name} to={`/categories/${val.path}`}>
        //                 <NavItem>{val.name}</NavItem>
        //             </Link>
        //         )}
        //         </Nav>
        //     </Navbar>
        // );
        return (
            <span>
                <h1 className="category-heading">Categories</h1>
                {this.props.categories && this.props.categories.map(val =>
                    <Link key={val.name} to={`/categories/${val.path}`}>
                        <Button>{val.name}</Button>
                    </Link>
                )}
            </span>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {categories: state.DefaultReducer.categories}
};

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNav);
