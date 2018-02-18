import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';
import {getCategories} from "../../../store/CategoryActions";
import {getPosts, getCategoryPosts} from "../../../store/PostActions";
import {connect} from "react-redux";

const CATEGORY_ALL = 'ALL';


class CategoryNav extends Component {

    componentDidMount() {
        /* Need list of categories to display as Nav Items */
        this.props.getCategories();
    }


    handleCategoryClick = (category) => {
        return (e) => {
            if (category === CATEGORY_ALL) {
                this.props.history.push('/');
            } else {
                this.props.history.push(`/${category}`);
            }
        }
    };


    render() {

        const props = this.props;
        const activeCategory = props.category;
        const activeKey = props.CategoryReducer.categories.map((e) => e.name).indexOf(activeCategory) + 1 || 0;
        return (
            <Nav bsStyle="tabs" activeKey={activeKey}>
                <NavItem eventKey={0} onClick={this.handleCategoryClick(CATEGORY_ALL)}>all</NavItem>
                {props.CategoryReducer.categories.map((val, idx) =>
                    <NavItem key={val.name} eventKey={idx + 1}
                             onClick={this.handleCategoryClick(val.name)}>{val.name}</NavItem>
                )}
            </Nav>
        );
    }
}


const mapStateToProps = ({CategoryReducer}) => ({CategoryReducer});

export default withRouter(connect(mapStateToProps, {getCategories, getPosts, getCategoryPosts})(CategoryNav));
