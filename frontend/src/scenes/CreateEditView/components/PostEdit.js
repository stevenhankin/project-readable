import {connect} from "react-redux";
import React, {Component} from 'react';
import {getPost, updatePost, createPost} from "./actions";
import {Form, FormGroup, ControlLabel, FormControl, Button, Badge, Col, Row, Well, Clearfix} from 'react-bootstrap';

class PostEdit extends Component {

    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isCreating = this.isCreating.bind(this);

        /*
        isLoading flag to prevent flicker.
        Set isLoading flag to suppress render of post
        in case a previous post is already in props.
        "creating" is true if no postId has been supplied
         */
        this.state = {
            isLoading: true,
            selectedCategory: "b",
            creating: props.postId == null ? true : false,
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
     * TODO
     * @param e
     */
    handleAuthorChange(event) {
        /* TODO */
        // console.log('Author Change detected', e.target.value);
        this.setState({post: {...this.state.post, author: event.target.value}});
        // this.setState({selectedAuthor: e.target.value});
    }

    handleCategoryChange(e) {
        /* TODO */
        console.log('Category Change detected', e.target.value);
        this.setState({selectedCategory: e.target.value});
    }

    /**
     * Async update of current state to server
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        console.log('SUBMIT!', this.state);
        const post = this.state.post;
        if (this.state.creating) {
            /*
            CREATE
             */
            const randomId = Math.random().toString(16).substr(2);
            const newPost = {...post, id: randomId, timestamp: Date.now()};
            this.props.createPost(newPost);
        }
        else {
            /*
            UPDATE
             */
            console.log('UPDATING post', post);
            this.props.putPost(post.id, post.title, post.body);
        }
    }


    /**
     * Redux will map received properties from the server
     * then they will be copied into Controlled Component state
     * for local handling; want to avoid continual updates to
     * server for optimum performance
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        console.log('CREATING = FALSE');
        this.setState({post: {...nextProps.post}, creating: false});
    }

    render() {
        const props = this.props;

        return (
            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={6}>
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
                                <FormControl type="text" value={(!props.isLoading && this.state.post.title) || ''}
                                             onChange={this.handleTitleChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Body</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl type="text" componentClass="textarea" rows={5}
                                             value={(!props.isLoading && this.state.post.body) || ''}
                                             onChange={this.handleBodyChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Author</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl type="text" value={(!props.isLoading && this.state.post.author) || ''}
                                             onChange={this.handleAuthorChange}/>

                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Category</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl componentClass="select" value={this.state.selectedCategory}
                                             onChange={this.handleCategoryChange}>
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                </FormControl>
                            </Col>
                        </Row>

                        <Row>
                            <Col xsOffset={2} xs={2}>
                                <Button type="submit" onClick={this.handleSubmit} disabled={props.isLoading}
                                        bsStyle="primary">Submit</Button>
                                {/*<Button bsStyle="warning" onClick={this.cancelEdit}>Cancel</Button>*/}
                            </Col>
                        </Row>

                    </Col>

                     {/*No need to show votes and comment count when creating NEW post */}
                    {this.state.creating ||
                    <Col xsOffset={1} xs={3}>

                        <Row>
                            <Col xs={12} className="text-right">
                                <ControlLabel>Votes</ControlLabel>
                                <Badge className="myFormControl">{this.state.post.voteScore}</Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="text-right">
                                <ControlLabel>Comment Count</ControlLabel>
                                <Badge className="myFormControl">{this.state.post.commentCount}</Badge>
                            </Col>
                        </Row>
                    </Col>
                    }

                </Row>

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
