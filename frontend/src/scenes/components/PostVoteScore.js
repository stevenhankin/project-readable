import React, {Component} from 'react';
import {Badge} from 'react-bootstrap';
import {upVote, downVote} from "../../store/PostActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


/**
 * Component for displaying the voting score of a Post
 * and the icons for changing the vote
 */
class PostVoteScore extends Component {
    constructor(props) {
        super(props);
        this.upVoteHandler = this.upVoteHandler.bind(this)
        this.downVoteHandler = this.downVoteHandler.bind(this)
    }

    upVoteHandler(e) {
        e.stopPropagation();
        this.props.upVote(this.props.postId);

    };

    downVoteHandler(e) {
        e.stopPropagation();
        this.props.downVote(this.props.postId);
    };


    render() {
        const post = this.props.post || {};
        return (
            <span onClick={(e) => {
                e.stopPropagation()
            }}>
                <span className="glyphicon glyphicon-thumbs-up vote-score-glyph-left" onClick={this.upVoteHandler}/>
                <Badge>{post.voteScore}</Badge>
                <span className="glyphicon glyphicon-thumbs-down vote-score-glyph-right"
                      onClick={this.downVoteHandler}/>
            </span>
        );
    }
}

PostVoteScore.propTypes = {
    postId: PropTypes.string.isRequired
};

const mapStateToProps = ({PostReducer}) => ({PostReducer});

export default connect(mapStateToProps, {upVote, downVote})(PostVoteScore);
