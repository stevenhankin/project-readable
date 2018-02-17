import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost,deletePost} from "../../../../../store/PostActions";
import {createToast} from "../../../../../store/ToastActions";
import {withRouter} from 'react-router-dom';
import { Button, Form, ControlLabel, Badge, Col, Row} from 'react-bootstrap';

class PostView extends Component {

    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        props.getPost(this.props.postId);
    }

    /**
     * Launch action to delete post
     */
    deleteHandler() {
        /* If successful, a toast will display to user on next page */
        this.props.deletePost(this.props.postId);
    }

    /**
     * Copy props into state for Controlled Component
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {

        if (nextProps.PostReducer.modified) {
            // Homepage redirect
            nextProps.history.push('/');
        }

        this.setState({post: nextProps.PostReducer.posts[this.props.postId], modified: nextProps.PostReducer.modified});
    }

    render() {

        const post = (this.state && this.state.post)||{};

        return (
            <Form componentClass="fieldset" horizontal>

                <Row>
                    <Col xs={8}>
                        <Row>
                            <Col xs={2}>
                                <strong>Title</strong>
                            </Col>
                            <Col xs={10}>
                                <p>{post.title}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <strong>Body</strong>
                            </Col>
                            <Col xs={10}>
                                <p>{post.body}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <strong>Author</strong>
                            </Col>
                            <Col xs={10}>
                                <p>{post.author}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <strong>Category</strong>
                            </Col>
                            <Col xs={10}>
                                <p>{post.category}</p>
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
                    <Col xs={12}>
                        <h2>Delete this post...are you sure?</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button className="h1 heading-button" bsStyle="warning" onClick={this.deleteHandler}>Yes!
                            Delete...</Button>

                        {/*<Link to={`/post/view/${post.id}`}>*/}
                            <Button className="h1 heading-button" onClick={this.props.history.goBack}>Cancel</Button>
                        {/*</Link>*/}

                    </Col>
                </Row>

            </Form>
        )
    }
}


const mapStateToProps = ({PostReducer}) => ({PostReducer});

export default withRouter(connect(mapStateToProps, {getPost,deletePost,createToast})(PostView));
