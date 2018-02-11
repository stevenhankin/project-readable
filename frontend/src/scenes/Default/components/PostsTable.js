import React, {Component} from 'react';
import {fetchPosts} from '../../../services/api.js';
import {Link, withRouter} from 'react-router-dom';
import {Table, Badge} from 'react-bootstrap';


class PostsTable extends Component {
    constructor(props) {
        super(props);

        /*
        Changing the order of the columns within the array
        facilitates the changing of order on the screen
        without breaking functionality
         */
        this.columns = [
            {name: "Date", field: "timestamp"},
            {name: "Title", field: "title"},
            {name: "Body", field: "body"},
            {name: "Author", field: "author"},
            {name: "Category", field: "category"},
            {name: "Votes", field: "voteScore", badge: true},
            {name: "Deleted", field: "deleted"},
            {name: "Comments", field: "commentCount", badge: true}
        ];

        /*
        Storing the posts, index of sort
        column and sort direction
        */
        this.state = {
            posts: [],
            sortCol: 0,
            sortDir: "",
            categoryFilter: props.category
        };
    }

    /**
     * Curry function for each column heading
     * If a new sort column is clicked, it will become the active sort column with initial ascending sort order
     * If the same sort column is clicked, the sort direction will be flipped
     * i.e. a render will always trigger on header click
     * @param newCol
     * @returns {function(*)}
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

    /**
     * Fetch the PostsTable when
     * component has mounted
     */
    componentDidMount() {
        fetchPosts().then(posts => {
            this.setState({
                posts
            });
        });
    }

    /**
     * Produce a human readable value for
     * the supplied javascript timestamp
     * @param tstamp
     * @returns {string}
     */
    formatTimestamp(tstamp) {
        return new Date(tstamp)
            .toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
    }

    /**
     * Return table header elements
     * Keeps track of which column to sort and in which direction
     * @returns Array of the headers with icon on sorted column
     */
    tableHeadings() {
        const SORT_ASC_ICON = 'glyphicon glyphicon-sort-by-order';
        const SORT_DESC_ICON = 'glyphicon glyphicon-sort-by-order-alt';
        return this.columns
            .map((val, idx) => {
                return <th key={val.name} onClick={this.setSortCol(idx)}>{val.name}
                    {this.state.sortCol === idx &&
                    (<span>&nbsp;<span className={this.state.sortDir === 'ASC' ?
                        SORT_ASC_ICON : SORT_DESC_ICON}
                                       aria-hidden="true"/></span>)}
                </th>
            })
    }

    /**
     * When a row is clicked on a Posts table,
     * jump to the Edit screen of the post
     * @param postId
     */
    rowClickHandler(postId) {
        this.props.history.push(`/post/edit/${postId}`);
    }

    /**
     * Returns a filtered, sorted table body of PostsTable
     * @returns {*}
     */
    sortedTableBody() {
        /*
        An ascending field sorter
         */
        const compareASC = (sortBy) => (a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            return 0;
        };
        /*
        A descending field sorter
         */
        const compareDESC = (sortBy) => (a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return -1;
            }
            if (a[sortBy] < b[sortBy]) {
                return 1;
            }
            return 0;
        };
        const sortBy = this.columns[this.state.sortCol].field;
        const sorter = this.state.sortDir === "ASC" ? compareASC(sortBy) : compareDESC(sortBy);
        /*
        Category Filter is set on navigate from Default Screen
        by clicking on an available category
         */
        const categoryFilter = this.state.categoryFilter;
        /*
        Rows are filtered (by category) BEFORE sorting, as a potential performance optimization
         */
        const filteredRows = categoryFilter ? this.state.posts.filter(post => post.category === categoryFilter) : this.state.posts;
        const sortedRows = filteredRows.sort(sorter).map(post => {
            return (
                <tr key={post.id} onClick={() => this.rowClickHandler(post.id)}>
                    {this.columns.map((column, idx) =>
                        <td key={idx}>
                            {column.badge ?
                                <Badge>
                                    {column.field === "timestamp" ? this.formatTimestamp(post[column.field]) : post[column.field]}
                                </Badge>
                                :
                                column.field === "timestamp" ? this.formatTimestamp(post[column.field]) : post[column.field]
                            }
                        </td>)}
                </tr>
            )
        });
        return <tbody>{sortedRows}</tbody>
    }

    render() {
        return (
            <div>
                <h1>Posts <Link to="/post/create">
                    <small><span className="glyphicon glyphicon-plus-sign"/></small>
                </Link></h1>
                <Table className="table table-striped" hover>
                    <thead>
                    <tr>
                        {this.tableHeadings()}
                    </tr>
                    </thead>
                    {this.sortedTableBody()}
                </Table>
            </div>
        )
    }
}

export default withRouter(PostsTable);
