import {connect} from "react-redux";
import React, {Component} from 'react';
import {getComments} from "./actions";
import {Table,Badge} from 'react-bootstrap';
import TimeAgo from 'timeago-react';
import {Link, withRouter} from 'react-router-dom';

class CommentsView extends Component {

    constructor(props) {
        super(props);

        this.commentClickHandler = this.commentClickHandler.bind(this);
        this.props.getComments(this.props.postId);

    }



    commentClickHandler= (postId, commentId) => () => {
        console.log('Clicked comment',commentId);
        this.props.history.push(`/post/${postId}/comment/${commentId}/edit`);
    };

    render() {
        const props = this.props;
        const comments = this.props.comments;

        console.log('RENDER',comments);

        if (!comments ) {
            return <div>Loading..</div>;
        }

        return (
            <div>

                <h1>Comments <Link to={`/post/${props.postId}/comment/create`}>
                    <small><span className="glyphicon glyphicon-plus-sign"/></small>
                </Link></h1>

                <Table>
                    <thead>
                    <tr>
                        <th>Created</th>
                        <th>Comment</th>
                        <th>Author</th>
                        <th>Vote Score</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        comments && comments.map(
                            comment =>
                                <tr key={comment.id} onClick={this.commentClickHandler(props.postId,comment.id)}>
                                    <td><TimeAgo datetime={comment.timestamp}/></td>
                                    <td>{comment.body}</td>
                                    <td>{comment.author}</td>
                                    <td><Badge>{comment.voteScore}</Badge></td>
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
    console.log('state',state);
    return {postId: ownProps.postId, comments: state.PostDetailViewReducer.comments }
};

const mapDispatchToProps = dispatch => ({
    getComments: (postId) => dispatch(getComments(postId)),
    // putPost: (id, title, body) => dispatch(updatePost(id, title, body)),
    // createPost: (postDetails) => dispatch(createPost(postDetails))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsView));
