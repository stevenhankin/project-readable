import {connect} from "react-redux";
import React, {Component} from 'react';
import * as actions from "../../../../../store/PostActions";
import * as ToastActions from "../../../../../store/ToastActions";
import {Link, withRouter} from 'react-router-dom';
import {Alert, Button, Form, ControlLabel, FormControl, Badge, Col, Row, Well} from 'react-bootstrap';

class PostView extends Component {

    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        console.log('GET POST')
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

        if (nextProps.deleted) {
            // Homepage redirect
            nextProps.history.push(`/`);
        }

        this.setState({post: nextProps.post, modifiedOK: nextProps.modifiedOK});
    }

    render() {

        console.log('***PostEdit in CreateEditView');

        console.log('state',this.state);
        console.log('props',this.props);
        console.log('post',post);
        const props = this.props;
        const post = (this.state && this.state.post)||{};

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
    console.log('mapStateToProps',state,ownProps);
    return {postId: ownProps.postId,
        deleted: state.PostReducer.deleted,
        post: state.PostReducer.posts[ownProps.postId],
        toast:state.PostReducer.toast}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(actions.getPost(postId)),
    deletePost: (postId) => dispatch(actions.deletePost(postId)),
    raiseToast: (msg) => dispatch(ToastActions.createToast(msg))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
