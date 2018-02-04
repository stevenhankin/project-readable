import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost, updatePost, createPost} from "./actions";
import {Form, FormGroup, ControlLabel, FormControl, Button, Badge, Col, Row, Well} from 'react-bootstrap';
import uuidv1 from 'uuid/v1';

class PostEdit extends Component {

    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isCreating = this.isCreating.bind(this);

        console.log('props is', props);
        // let creating = false;
        // if (props.postId) {
        //     creating = false;
        //
        // }
        // else {
        //     creating = true;
        // }

        /*
        isLoading flag to prevent flicker.
        Set isLoading flag to suppress render of post
        in case a previous post is already in props.
         */
        this.state = {
            isLoading: true,
            creating:false || props.postId,
            post: {id: '', title: '', body: '', timestamp: '', author: '', category: ''}
        };

        /*
        If params passed, this is an Edit; use the ID
        to get the required POST
         */
        if (props.postId) {
            /* Async fetch for the supplied post id */
            props.getPost(props.postId);
        }

    }

    /**
     * Return true if Creating a NEW post
     * otherwise false
     * @returns {*}
     */
    isCreating() {
        return this.state.creating;
    }

    handleTitleChange(event) {
        this.setState({post: {...this.state.post, title: event.target.value}});
    }

    handleBodyChange(event) {
        this.setState({post: {...this.state.post, body: event.target.value}});
    }


    /**
     * Async update of current state to server
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        console.log('SUBMIT!');

        if (this.props.postId) {
            console.log('Updating post', this.props.postId);
            this.props.putPost(this.state.id, this.state.title, this.state.body);
        } else {
            /*
               POST /posts
               USAGE:
                   Add a new post

               PARAMS:
                   id - UUID should be fine, but any unique id will work
               timestamp - timestamp in whatever format you like, you can use Date.now() if you like
               title - String
               body - String
               author - String
               category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
           */
            // const randomId =uuidv1();
            const randomId = Math.random().toString(36).substr(-8);
            console.log(randomId);
            const post = {...this.state.post, id: randomId, timestamp: Date.now()};
            console.log('Creating post', uuidv1(), post);
            this.props.createPost(post);
        }


        // console.log('POST ID IS...',this.props.postId);

    }

    /**
     * Redux will map received properties from the server
     * then they will be copied into Controlled Component state
     * for local handling; want to avoid continual updates to
     * server for optimum performance
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState({post:{...nextProps.post}, creating:false});
    }

    render() {
        const props = this.props;

        return (
            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={12}>
                        <h1>Post
                            <span className="myFormControl">
                            <span><Button type="submit" onClick={this.handleSubmit} disabled={props.isLoading}
                                          bsStyle="primary">Submit</Button>
                                {/*<Button bsStyle="warning" onClick={this.cancelEdit}>Cancel</Button>*/}
                            </span>

                            </span>
                        </h1>
                    </Col>
                </Row>

                <Col xs={8}>
                    <Row>
                        <FormGroup>
                            <Col xs={1}>
                                <ControlLabel>Title</ControlLabel>
                            </Col>
                            <Col xs={11}>

                                <FormControl type="text" value={(!props.isLoading && this.state.post.title) || ''}
                                             onChange={this.handleTitleChange}/>

                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col xs={1}>
                                <ControlLabel>Body</ControlLabel>
                            </Col>
                            <Col xs={11}>
                                <FormControl type="text" componentClass="textarea"
                                             value={(!props.isLoading && this.state.post.body) || ''}
                                             onChange={this.handleBodyChange}/>

                            </Col>
                        </FormGroup>
                    </Row>

                </Col>

                <Col xs={1}/>

                <Col xs={3}>
                    <Row>
                        <FormGroup>
                            <Col xs={6}>
                                <ControlLabel>Author</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <Well bsSize="small">{this.state.post.author}</Well>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col xs={6}>
                                <ControlLabel>Category</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <Well bsSize="small">{this.state.post.category}</Well>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Col xs={6}>
                                <ControlLabel>Vote Score</ControlLabel>
                            </Col>
                            <Col xs={2}>
                                <p><Badge>{this.state.post.voteScore}</Badge></p>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col xs={6}>
                                <ControlLabel>Comment Count</ControlLabel>
                            </Col>
                            <Col xs={2}>
                                <p><Badge>{this.state.post.commentCount}</Badge></p>
                            </Col>
                        </FormGroup>
                    </Row>
                </Col>

            </Form>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps);
    return {postId: ownProps.postId, post: state.post, isLoading: state.isLoading}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId)),
    putPost: (id, title, body) => dispatch(updatePost(id, title, body)),
    createPost: (postDetails) => dispatch(createPost(postDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
