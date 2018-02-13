import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {getCategories} from "../../../store/CategoryActions";
import {connect} from "react-redux";


class CategoryNav extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        this.props.getCategories();
        return (
            <span>
                <h1 className="category-heading">Categories</h1>
                {this.props.categories.map(val =>
                    <Link key={val.name} to={`/categories/${val.path}`}>
                        <Button>{val.name}</Button>
                    </Link>
                )}
            </span>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {categories: state.CategoryReducer.categories}
};

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNav);
