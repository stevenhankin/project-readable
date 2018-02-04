import React, {Component} from 'react';
import {fetchCategories} from '../../../services/api.js';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';


class CategoryNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        fetchCategories().then(({categories}) => {
            this.setState({
                categories
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Categories</h1>
                {this.state.categories.map(val =>
                    <Link  key={val.name} to={`/categories/${val.path}`}>
                    <Button>
                {val.name}
                    </Button>
                    </Link>
                )}
            </div>
        );
    }
}

export default CategoryNav;
