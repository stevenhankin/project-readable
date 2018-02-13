import React, {Component} from 'react';
// import {fetchCategories} from '../../../services/api.js';
import {Link, withRouter} from 'react-router-dom';
import {Badge, Button, Nav, Navbar, NavItem} from 'react-bootstrap';
// import {getCategories} from "./actions";
import * as action from "./actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


class PostVoteScore extends Component {
    constructor(props) {
        super(props);

        // this.props.getCategories();
        console.log('POSTID IS ', this.props.postId);
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

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
    }

    render() {

        console.log('PostVoteScoreReducer', this.props);


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
    return {postId: ownProps.postId, post: state.PostVoteScoreReducer.post}
    // return {postId: state.DefaultReducer.categories}
};


const mapDispatchToProps = dispatch => ({
    upVote: (id) => dispatch(action.upVote(id)),
    downVote: (id) => dispatch(action.downVote(id))
});

// export default connect(mapStateToProps, mapDispatchToProps)(VoteScore);

export default connect(mapStateToProps, mapDispatchToProps)(PostVoteScore);
