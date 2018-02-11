import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost} from "./actions";
import {Link} from 'react-router-dom';
import {Button,Form, ControlLabel, FormControl, Badge, Col, Row, Well} from 'react-bootstrap';

class PostView extends Component {

    constructor(props) {
        super(props);
        this.props.getPost(this.props.postId);
    }

    render() {
        const post = this.props.post;

        if (!post) {
            /* Post details not available yet - don't render */
            return;
        }

        return (
            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={2}>
                        <h1>Post</h1>
                    </Col>
                    <Col xs={2}>
                            <Link to={`/post/edit/${post.id}`}>
                                <Button className="h1 heading-button" bsStyle="primary">Edit</Button>
                            </Link>
                    </Col>
                    <Col>
                            <Link to={`/post/delete/${post.id}`}>
                                <Button className="h1 heading-button" bsStyle="danger">Delete</Button>
                            </Link>

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

            </Form>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return {postId: ownProps.postId, post: state.PostDetailViewReducer.post}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostView);
