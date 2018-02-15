import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';
import {getCategories} from "../../../store/CategoryActions";
import * as PostActions from "../../../store/PostActions";
import {connect} from "react-redux";

const CATEGORY_ALL = 'ALL';


class CategoryNav extends Component {


    constructor(props) {
        super(props);
        this.props.getCategories();
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    handleCategoryClick(category) {
        return (e) => {
            if (category === CATEGORY_ALL) {
                this.props.getPosts();
                this.props.history.push('/');
            } else {
                this.props.getCategoryPosts(category);
                this.props.history.push(`/categories/${category}`);
            }
        }
    }


    render() {

        const props = this.props;
        const activeCategory = this.props.category;
        const activeKey = props.categories.map((e) => e.name).indexOf(activeCategory) + 1 || 0;
        return (
            <Nav bsStyle="tabs" activeKey={activeKey}>
                <NavItem eventKey={0} onClick={this.handleCategoryClick(CATEGORY_ALL)}>all</NavItem>
                {this.props.categories.map((val, idx) =>
                    <NavItem key={val.name} eventKey={idx + 1}
                             onClick={this.handleCategoryClick(val.name)}>{val.name}</NavItem>
                )}
            </Nav>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {categories: state.CategoryReducer.categories, category: ownProps.category}
};

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    getPosts: () => dispatch(PostActions.getPosts()),
    getCategoryPosts: (category) => dispatch(PostActions.getCategoryPosts(category))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryNav));
