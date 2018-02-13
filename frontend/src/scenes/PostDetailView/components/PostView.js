import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost,getPosts} from "../../../store/PostActions";
import {Link} from 'react-router-dom';
import {Button, Form, ControlLabel, FormControl, Badge, Col, Row, Well} from 'react-bootstrap';
import PostVoteScore from "../../components/PostVoteScore";

class PostView extends Component {

    constructor(props) {
        super(props);

        props.getPost(props.postId);
    }

    render() {

        const post = this.props.posts[this.props.postId] ||{};

        return (
            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={2}>
                        <h1>Post</h1>
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

                        <Row>
                            <Col xsOffset={2} xs={2}>
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
                    </Col>

                    <Col xsOffset={1} xs={3}>
                        <Row>
                                <Col xs={4}>
                                <ControlLabel>Votes</ControlLabel>
                                </Col>
                                <Col xs={6}>
                                    <PostVoteScore postId={this.props.postId}/>
                                </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <ControlLabel>Comments</ControlLabel>
                            </Col>
                            <Col xs={6}>
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
    console.log('MAPPING posts:',state.PostReducer.posts);
    return {postId: ownProps.postId, posts: state.PostReducer.posts}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId)),
    getPosts: () => dispatch(getPosts())
});


export default connect(mapStateToProps, mapDispatchToProps)(PostView);
