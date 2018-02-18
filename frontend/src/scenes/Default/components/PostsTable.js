import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Table, Badge, Button} from 'react-bootstrap';
import TimeAgo from 'timeago-react';
import {connect} from "react-redux";
import {getPosts, getCategoryPosts} from "../../../store/PostActions";
import PostVoteScore from '../../components/PostVoteScore';

class PostsTable extends Component {
    constructor(props) {
        super(props);

        /*
        Changing the order of the columns within the array
        facilitates the changing of order on the screen
        without breaking functionality
         */
        this.columns = [
            {name: "Created", field: "timestamp", timeAgo: true},
            {name: "Title", field: "title"},
            {name: "Body", field: "body"},
            {name: "Author", field: "author"},
            {name: "Category", field: "category"},
            {name: "Votes", field: "voteScore", badge: true},
            {name: "Comments", field: "commentCount", badge: true}
        ];

        /*
        Storing the posts, index of sort
        column and sort direction
        */
        this.state = {
            sortCol: 0,
            sortDir: "ASC"
        };
    }

    /**
     * Initialisation
     */
    componentDidMount() {
        const category = this.props.match.params.category;
        if (category) {
            this.props.getCategoryPosts(category);
        } else {
            this.props.getPosts();
        }
    }

    componentWillReceiveProps(nextProps) {
        const prevCategory = this.props.match.params.category;
        const category = nextProps.match.params.category;
        if (category !== prevCategory) {
            if (category) {
                this.props.getCategoryPosts(category);
            } else {
                this.props.getPosts();
            }
        }
    }

    /*  */

    /**
     * Jump to Edit screen
     * Need to do this as an onClick handler to stop
     * event propagation
     *
     * @param postId
     */
    handleEditPost = (postId) => {
        return (e) => {
            e.stopPropagation();
            this.props.history.push(`/post/edit/${postId}`);
        }
    };

    /**
     * Jump to Delete screen
     * Need to do this as an onClick handler to stop
     * event propagation
     *
     * @param postId
     */
    handleDeletePost = (postId) => {
        return (e) => {
            e.stopPropagation();
            this.props.history.push(`/post/delete/${postId}`);
        }
    };

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
        const SORT_ASC_ICON = 'glyphicon glyphicon-sort-by-attributes my-glyph-pad';
        const SORT_DESC_ICON = 'glyphicon glyphicon-sort-by-attributes-alt my-glyph-pad';
        return this.columns
            .map((val, idx) => {
                return <th key={val.name} onClick={this.setSortCol(idx)}>{val.name}
                    {this.state.sortCol === idx &&
                    (<span className={this.state.sortDir === 'ASC' ?
                        SORT_ASC_ICON : SORT_DESC_ICON} aria-hidden="true"/>)}
                </th>
            }).concat(
                <th key={100}>Edit</th>
            ).concat(
                <th key={101}>Delete</th>
            )
    }

    /**
     * When a row is clicked on a Posts table,
     * jump to the Post Detail View
     * @param postId
     */
    cellClickHandler(postId) {
        this.props.history.push(`/post/view/${postId}`);
    }

    /**
     * Returns a filtered, sorted table body of PostsTable
     * @returns {*}
     */
    sortedTableBody(posts) {
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
        const column = this.columns[this.state.sortCol];
        const sortBy = column.field;
        /*
        To make the sort more intuitive, order the TimeAgo column
        in the reverse to other columns (because TimeAgo is decreases
        as timestamp increases)
         */
        const sorter = column.timeAgo ?
            this.state.sortDir === "ASC" ? compareDESC(sortBy) : compareASC(sortBy)
            : this.state.sortDir === "ASC" ? compareASC(sortBy) : compareDESC(sortBy);

        const sortedRows = Object.values(posts).sort(sorter).map((post, idx) => {
            /* Guard against undefined post when returning from a 404 */
            if (!post.id) return <tr key={idx}/>
            return (
                <tr key={post.id} onClick={() => this.cellClickHandler(post.id)}>
                    {this.columns.map((column, idx) =>
                        <td key={idx}>

                            {
                                column.field === "voteScore" ?
                                    <PostVoteScore postId={post.id}/>
                                    : <span>
                                        {column.badge ?
                                            <Badge>{post[column.field]}</Badge>
                                            : column.timeAgo ?
                                                <TimeAgo datetime={post[column.field]}/>
                                                : post[column.field]}
                                        </span>
                            }

                        </td>)
                        .concat(
                            <td key={100} onClick={this.handleEditPost(post.id)}>
                                <span className="glyphicon glyphicon-pencil"/>
                            </td>
                        ).concat(
                            <td key={101} onClick={this.handleDeletePost(post.id)}>
                                <span className="glyphicon glyphicon-trash"/>
                            </td>
                        )
                    }
                </tr>

            )
        });
        return <tbody>{sortedRows}</tbody>;
    }

    render() {
        /*
        Need to convert the object mapping IDs to Posts to be an array of Posts
         */
        const posts = Object.values(this.props.PostReducer.posts);
        return (
            <div>
                <Link to="/post/create">
                    <Button bsStyle="primary">
                        <span className="glyphicon glyphicon-plus-sign"/>Add post
                    </Button>
                </Link>

                <Table className="table table-striped" hover>
                    <thead>
                    <tr>
                        {this.tableHeadings()}
                    </tr>
                    </thead>
                    {this.sortedTableBody(posts)}
                </Table>
            </div>
        )
    }
}


const mapStateToProps = ({PostReducer}) => ({PostReducer});

export default withRouter(connect(mapStateToProps, {getPosts, getCategoryPosts})(PostsTable));
