import React, {Component} from 'react';
import {fetchPosts} from '../../../services/api.js';
import {Link} from 'react-router-dom';

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
            {name: "Votes", field: "voteScore"},
            {name: "Deleted", field: "deleted"},
            {name: "Comments", field: "commentCount"}
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


    compareASC = (sortBy) =>  (a,b) => {
        if (a[sortBy]  < b[sortBy] ) {
            return -1;
        }
        if (a[sortBy]  > b[sortBy] ) {
            return 1;
        }
        return 0;
    };

    compareDESC = (sortBy) => (a,b) => {
        if (a[sortBy]  > b[sortBy] ) {
            return -1;
        }
        if (a[sortBy]  < b[sortBy] ) {
            return 1;
        }
        return 0;
    };

    /**
     * Returns a filtered, sorted table body of PostsTable
     * Category filtering (when a category is specified) is done before sort,
     * to reduce effort on sort
     * @returns {*}
     */
    sortedTableBody() {
        const sortBy = this.columns[this.state.sortCol].field;
        const sorter = this.state.sortDir === "ASC" ? this.compareASC(sortBy):this.compareDESC(sortBy);
        const categoryFilter = this.state.categoryFilter;
        const filteredRows = categoryFilter ? this.state.posts.filter(post => post.category === categoryFilter) : this.state.posts;
        const sortedRows = filteredRows.sort(sorter).map(post => {
                return (
                    <tr key={post.id}>
                        {this.columns.map((column, idx) => <td key={idx}><Link to={`/post/edit/${post.id}`}>{
                            column.field === "timestamp" ? this.formatTimestamp(post[column.field]) : post[column.field]}
                        </Link></td>)}

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
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {this.tableHeadings()}
                    </tr>
                    </thead>
                    {this.sortedTableBody()}
                </table>
            </div>
        )}
}

export default PostsTable;
