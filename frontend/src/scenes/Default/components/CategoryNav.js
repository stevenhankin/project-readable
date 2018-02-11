import React, {Component} from 'react';
import {fetchCategories} from '../../../services/api.js';
import {Link, withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {getCategories} from "./actions";
import {connect} from "react-redux";


class CategoryNav extends Component {
    constructor(props) {
        super(props);

        this.props.getCategories();
    }
    //
    // componentDidMount() {
    //     fetchCategories().then(({categories}) => {
    //         this.setState({
    //             categories
    //         });
    //     });
    // }

    render() {
        console.log('CATS',this.props);
        return (
            <div>
                <h1>Categories</h1>
                {this.props.categories && this.props.categories.map(val =>
                    <Link key={val.name} to={`/categories/${val.path}`}>
                        <Button>{val.name}</Button>
                    </Link>
                )}
            </div>
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
