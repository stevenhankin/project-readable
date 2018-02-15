import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost, getPosts} from "../../../store/PostActions";
import {Link,withRouter} from 'react-router-dom';
import {Button, Form, Badge, Col, Row, Panel} from 'react-bootstrap';
import PostVoteScore from "../../components/PostVoteScore";

class PostView extends Component {

    constructor(props) {
        super(props);

        props.getPost(props.postId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postId && !nextProps.posts[nextProps.postId]) {
            /* Post does not exist...redirecting to "404"-like page */
            nextProps.history.replace('/postNotFound')
        }
    }

    render() {

        const post = this.props.posts[this.props.postId] || {};

        return (
            <Form componentClass="fieldset" horizontal>


                <Row>
                    <Col xs={8}>
                        <Panel bsStyle="primary"><Panel.Heading>
                            <Panel.Title>{post.title}</Panel.Title>
                        </Panel.Heading>
                            <Panel.Body>{post.body}</Panel.Body>
                        </Panel>
                    </Col>

                    <Col xs={4}>

                        <Panel>
                            <Row>
                                <Col xs={4}>
                                    <strong>Author</strong>
                                </Col>
                                <Col xs={8}>
                                    <p>{post.author}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <strong>Category</strong>
                                </Col>
                                <Col xs={8}>
                                    <p>{post.category}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <strong>Votes</strong>
                                </Col>
                                <Col xs={8}>
                                    <PostVoteScore postId={this.props.postId}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <strong>Comments</strong>
                                </Col>
                                <Col xs={8}>
                                    <Badge className="myFormControl">{post.commentCount}</Badge>
                                </Col>
                            </Row>
                        </Panel>


                    </Col>

                </Row>

                <Row>
                    <Col xs={8}>

                        <Link to={`/post/edit/${post.id}`}>
                            <Button bsStyle="primary" bsSize="small">
                                <span className="glyphicon glyphicon-pencil"/>Edit post
                            </Button>
                        </Link>

                        <Link to={`/post/delete/${post.id}`}>
                            <Button bsStyle="danger" bsSize="small">
                                <span className="glyphicon glyphicon-trash"/>Delete post
                            </Button>
                        </Link>
                    </Col>
                </Row>

            </Form>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return {postId: ownProps.postId, posts: state.PostReducer.posts}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId)),
    getPosts: () => dispatch(getPosts())
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
