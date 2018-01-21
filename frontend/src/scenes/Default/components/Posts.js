import React, {Component} from 'react';
import {fetchPosts} from '../../../services/api.js';
import { Link } from 'react-router-dom';

class Posts extends Component {
    constructor(props) {
        super(props);

        /*
        Changing the order of the columns within the array
        facilitates the changing of order on the screen
        without breaking functionality
         */
        this.columns = [
            {name: "Timestamp", field: "timestamp"},
            {name: "Title", field: "title"},
            {name: "Body", field: "body"},
            {name: "Author", field: "author"},
            {name: "Category", field: "category"},
            {name: "Vote Score", field: "voteScore"},
            {name: "Deleted", field: "deleted"},
            {name: "Comment Count", field: "commentCount"}
        ];

        console.log('Category filter is',props);

        /* Storing the posts, index of sort column and sort direction */
        this.state = {
            posts: [],
            sortCol: 0,
            sortDir: "",
            categoryFilter: props.category
        };
    }

    /*
    If a new sort column is clicked, it will become the active sort column with initial ascending sort order
    If the same sort column is clicked, the sort direction will be flipped
    i.e. a render will always trigger on header click
     */
    setSortCol(newCol) {
        return (e) => {
            e.preventDefault();
            const prevCol = this.state.sortCol;
            this.setState({
                sortCol: newCol,
                sortDir: newCol === prevCol ? (this.state.sortDir === "ASC" ? "DESC" : "ASC") : 'ASC'
            })
        }
    }

    componentDidMount() {
        fetchPosts().then(posts => {
            this.setState({
                posts
            });
        });
    }

    /* Product a human readable value for
       the supplied javascript timestamp */
    formatTimestamp(tstamp) {
        return new Date(tstamp)
            .toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
    }

    /*
    Returns a filtered, sorted table body of Posts
    Filtering is done first, to reduce effort on sort
     */
    sortedTableBody() {
        const sortBy = this.columns[this.state.sortCol].field;
        const categoryFilter = this.state.categoryFilter;
        const filteredRows = categoryFilter ? this.state.posts.filter( post => post.category === categoryFilter) : this.state.posts;
        const sortedRows = filteredRows
            .sort((a, b) => {
                    return this.state.sortDir === "ASC" ? a[sortBy] > b[sortBy] : a[sortBy] < b[sortBy]
                }
            )
            .map(post => {
                return (
                    <tr key={post.id}>
                        {this.columns.map((column, idx) => <td key={idx}>{
                            column.field === "timestamp" ? this.formatTimestamp(post[column.field]) : post[column.field]}</td>)}
                    </tr>
                )
            });
        return <tbody>{sortedRows}</tbody>
    }

    render() {
        const SORT_ASC_ICON = 'glyphicon glyphicon-sort-by-order';
        const SORT_DESC_ICON = 'glyphicon glyphicon-sort-by-order-alt';
        return (
            <div>
                <h1>Posts <Link to="/post/create"><span className="glyphicon glyphicon-plus-sign"/></Link></h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {this.columns
                            .map((val, idx) => {
                                return <th key={val.name} onClick={this.setSortCol(idx)}>{val.name}
                                    {this.state.sortCol === idx &&
                                    (<span>&nbsp;<span className={this.state.sortDir === 'ASC' ?
                                        SORT_ASC_ICON : SORT_DESC_ICON}
                                                       aria-hidden="true"/></span>)

                                    }
                                </th>
                            })}
                    </tr>
                    </thead>
                    {this.sortedTableBody()}
                </table>
            </div>
        );
    }
}

export default Posts;
