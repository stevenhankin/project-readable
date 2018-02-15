import {connect} from "react-redux";
import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom'
import {getPost, updatePost, createPost} from "../../../../../store/PostActions";
import {Form, ControlLabel, FormControl, Button, Badge, Col, Row, Well} from 'react-bootstrap';
import * as ToastActions from "../../../../../store/ToastActions";


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
            // selectedCategory: "b",
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

    handleAuthorChange(event) {
        this.setState({post: {...this.state.post, author: event.target.value}});
    }

    handleCategoryChange(e) {
        this.setState({post: {...this.state.post, category: e.target.value}});
    }

    /**
     * Async update of current state to server
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
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
            this.props.putPost(post.id, post.title, post.body, post.author);
        }
    }


    /**
     * Redux will map received properties from the server
     * then they will be copied into Controlled Component state
     * for local handling; want to avoid continual updates to
     * server for optimal performance
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {

        const thisPostId = nextProps.createdPostId || nextProps.postId;
        if (nextProps.modified) {
            /*
            Post View redirect when post updated
            to either the Created Post or Edited Post
            */
            const redirectPostId = thisPostId;
            nextProps.history.push(`/post/view/${redirectPostId}`);
        }
        this.setState({post: nextProps.posts[thisPostId], creating: false});
    }

    componentDidMount() {
        const initialCategory = this.props.categories[0].name;
        this.setState({post: {...this.state.post, category: initialCategory}})
    }

    render() {
        const props = this.props;
        const post = this.state.post;// || {title: '', author: '', body: '', category:};

        return (
            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={6}>
                        <h2>Editing Post</h2>
                    </Col>
                </Row>

                <Row>
                    <Col xs={8}>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Title</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl type="text" value={post.title || ''}
                                             onChange={this.handleTitleChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Body</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl type="text" componentClass="textarea" rows={5}
                                             value={(post.body) || ''}
                                             onChange={this.handleBodyChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Author</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                {this.state.creating ?
                                    <FormControl type="text" value={(!props.isLoading && post.author) || ''}
                                                 onChange={this.handleAuthorChange}/>
                                    :
                                    <Well>{post.author}</Well>
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Category</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                {this.state.creating ?
                                    <FormControl componentClass="select" value={post.category}
                                                 onChange={this.handleCategoryChange}>
                                        {
                                            props.categories.map(
                                                val => <option key={val.name} value={val.name}>{val.name}</option>
                                            )
                                        }
                                    </FormControl>
                                    :
                                    <Well>{post.category}</Well>
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col xsOffset={2} xs={10}>
                                <Button type="submit" onClick={this.handleSubmit}
                                        disabled={props.isLoading || (post.title.length === 0 || post.body.length === 0 || post.author.length === 0)}
                                        bsStyle="primary">Submit</Button>
                                <Link to='/'><Button bsStyle="warning">Cancel</Button></Link>
                            </Col>
                        </Row>

                    </Col>

                    {/*No need to show votes and comment count when creating NEW post */}
                    {this.state.creating ||
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
                    }

                </Row>

            </Form>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        postId: ownProps.postId,
        createdPostId: state.PostReducer.createdPostId,
        posts: state.PostReducer.posts,
        categories: state.CategoryReducer.categories,
        isLoading: state.PostReducer.isLoading,
        created: state.PostReducer.created,
        modified: state.PostReducer.modified
    }
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId)),
    putPost: (id, title, body) => dispatch(updatePost(id, title, body)),
    createPost: (postDetails) => dispatch(createPost(postDetails)),
    raiseToast: (msg) => dispatch(ToastActions.createToast(msg))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEdit));
