import {connect} from "react-redux";
import React, {Component} from 'react';
import * as action from "../../../store/CommentActions";
import {Table, Button} from 'react-bootstrap';
import TimeAgo from 'timeago-react';
import {Link, withRouter} from 'react-router-dom';
import CommentVoteScore from '../../components/CommentVoteScore';

class CommentsView extends Component {

    constructor(props) {
        super(props);

        this.commentClickHandler = this.commentClickHandler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.props.getComments(this.props.postId);
    }


    commentClickHandler = (postId, commentId) => () => {
        this.props.history.push(`/post/${postId}/comment/${commentId}/edit`);
    };

    handleDelete = (postId, commentId) => (e) => {
        e.stopPropagation();
        this.props.deleteComment(postId, commentId);
    };


    render() {
        const props = this.props;
        const comments = Object.values(this.props.comments);

        if (!comments) {
            return <div>Loading..</div>;
        }

        return (
            <div>

                <Link to={`/post/${props.postId}/comment/create`}>
                    <Button bsStyle="primary" bsSize="small">
                        <span className="glyphicon glyphicon-plus"/>Add comment
                    </Button>
                </Link>


                <Table>
                    <thead>
                    <tr>
                        <th>Created</th>
                        <th>Comment</th>
                        <th>Author</th>
                        <th>Vote Score</th>
                        <th>Delete?</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        comments && comments.map(
                            comment =>
                                <tr key={comment.id} onClick={this.commentClickHandler(props.postId, comment.id)}>
                                    <td><TimeAgo datetime={comment.timestamp}/></td>
                                    <td>{comment.body}</td>
                                    <td>{comment.author}</td>
                                    <td><CommentVoteScore commentId={comment.id}/></td>
                                    <td onClick={this.handleDelete(props.postId, comment.id)}><span
                                        className="glyphicon glyphicon-trash"/></td>
                                </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {postId: ownProps.postId, comments: state.CommentReducer.comments}
};


const mapDispatchToProps = dispatch => ({
    getComments: (postId) => dispatch(action.getComments(postId)),
    deleteComment: (postId, commentId) => dispatch(action.deleteComment(postId, commentId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsView));
