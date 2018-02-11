import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost, deletePost} from "./actions";
import {Link, withRouter} from 'react-router-dom';
import {Alert, Button, Form, ControlLabel, FormControl, Badge, Col, Row, Well} from 'react-bootstrap';

class PostView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleted: false
        }
        // this.props.getPost(this.props.postId);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    /**
     * Launch action to delete post
     */
    deleteHandler() {
        this.props.deletePost(this.props.postId);
    }


    render() {
        const post = this.props.post;
        const props = this.props;

        console.log('post', post);

        if (!post) {
            /* Post details not available - don't render yet and retrieve the post.. */
            props.getPost(this.props.postId);
            return;
        }

        if (props.deleted) {
            /*
            Homepage redirect after a few seconds
             */
            setTimeout(function () {
                props.history.push(`/`);
            }, 2000);
            return (
                <Alert bsStyle="warning">
                    <strong>Deleted post</strong> Will redirect to homepage..
                </Alert>
            )
        }

        return (
            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={12}>
                        <h1>Delete this post...</h1>
                    </Col>
                </Row>


                <Row>
                    <Col xs={8}>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Title</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <Well>{post.title}</Well>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Body</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl type="text" disabled componentClass="textarea" rows={5}
                                             value={(post.body) || ''}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Author</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <Well>{post.author}</Well>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Category</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <Well>{post.category}</Well>
                            </Col>
                        </Row>
                    </Col>

                    <Col xsOffset={1} xs={3}>
                        <Row>
                            <Col xs={12} className="text-right">
                                <ControlLabel>Votes</ControlLabel>
                                <Badge className="myFormControl">{post.voteScore}</Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="text-right">
                                <ControlLabel>Comment Count</ControlLabel>
                                <Badge className="myFormControl">{post.commentCount}</Badge>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col xs={4}>
                        <h1>...are you sure?</h1>
                    </Col>

                    <Col xs={2}>
                        <Button className="h1 heading-button" bsStyle="warning" onClick={this.deleteHandler}>Yes!
                            Delete...</Button>

                    </Col>
                    <Col>
                        <Link to={`/post/view/${post.id}`}>
                            <Button className="h1 heading-button">Cancel</Button>
                        </Link>

                    </Col>
                </Row>


            </Form>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    console.log('mappingstate', state.PostDeleteReducer);
    return {postId: ownProps.postId, deleted: state.PostDeleteReducer.deleted, post: state.PostDeleteReducer.post}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
