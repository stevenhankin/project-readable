import React, {Component} from 'react';
import {Badge} from 'react-bootstrap';
import * as action from "../../store/PostActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


class PostVoteScore extends Component {
    constructor(props) {
        super(props);
        this.upVoteHandler = this.upVoteHandler.bind(this)
        this.downVoteHandler = this.downVoteHandler.bind(this)
    }

    upVoteHandler(e) {
        console.log('UP VOTE', this.props.postId);
        e.stopPropagation();
        this.props.upVote(this.props.postId);

    };

    downVoteHandler(e) {
        e.stopPropagation();
        this.props.downVote(this.props.postId);
    };


    render() {
        return (
            <span>
                <Badge>{this.props.post.voteScore}</Badge>
                <span className="glyphicon glyphicon-thumbs-up" onClick={this.upVoteHandler}/>
                <span className="glyphicon glyphicon-thumbs-down" onClick={this.downVoteHandler}/>
            </span>
        );
    }
}

PostVoteScore.propTypes = {
    postId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {postId: ownProps.postId, post: state.PostReducer.post}
};

const mapDispatchToProps = dispatch => ({
    upVote: (id) => dispatch(action.upVote(id)),
    downVote: (id) => dispatch(action.downVote(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostVoteScore);
