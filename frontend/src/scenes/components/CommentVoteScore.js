import React, {Component} from 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import * as action from "../../store/CommentActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


class CommentVoteScore extends Component {
    constructor(props) {
        super(props);
        this.upVoteHandler = this.upVoteHandler.bind(this)
        this.downVoteHandler = this.downVoteHandler.bind(this)
    }

    upVoteHandler(e) {
        e.stopPropagation();
        this.props.upVote(this.props.commentId);

    };

    downVoteHandler(e) {
        e.stopPropagation();
        this.props.downVote(this.props.commentId);
    };


    render() {
        const comment = this.props.comment || {};
        return (
            <span onClick={(e)=>{e.stopPropagation()}}>
                <span className="glyphicon glyphicon-thumbs-up vote-score-glyph-left" onClick={this.upVoteHandler}/>
                <Badge >{comment.voteScore}</Badge>
                <span className="glyphicon glyphicon-thumbs-down vote-score-glyph-right" onClick={this.downVoteHandler}/>
            </span>
        );
    }
}

CommentVoteScore.propTypes = {
    commentId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {commentId: ownProps.commentId, comment: state.CommentReducer.comments[ownProps.commentId]}
};

const mapDispatchToProps = dispatch => ({
    upVote: (id) => dispatch(action.upVote(id)),
    downVote: (id) => dispatch(action.downVote(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(CommentVoteScore);
