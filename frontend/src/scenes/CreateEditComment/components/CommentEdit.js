import {connect} from "react-redux";
import React, {Component} from 'react';
import {getComment,createComment,updateComment} from "./actions";
import {Form, FormGroup, ControlLabel, FormControl, Button, Badge, Col, Row, Well} from 'react-bootstrap';
import {reducer as CreateEditCommentReducer} from "./reducer";

class CommentEdit extends Component {

    constructor(props) {
        super(props);

        // this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        // this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.isCreating = this.isCreating.bind(this);

        /*
        isLoading flag to prevent flicker.
        Set isLoading flag to suppress render of post
        in case a previous post is already in props.
        "creating" is true if no postId has been supplied
         */
        // this.state = {
        //     isLoading: true,
        //     // selectedCategory: "b",
        //     creating: props.postId == null ? true : false,
        //     post: {id: '', title: '', body: '', timestamp: '', author: '', category: ''}
        // };
        // id: Any unique ID. As with posts, UUID is probably the best here.
        //     timestamp: timestamp. Get this however you want.
        //     body: String
        // author: String
        // parentId: Should match a post id in the database.
        //

        /*
        If a Comment ID is NOT passed in,
        a new Comment is being created
         */
        this.state = {
            creating: !props.commentId,
            comment: {
                id: props.commentId,
                timestamp: Date.now(),
                body: "",
                author: '',
                parentId: props.postId
            }
        }

        console.log('comment state:',this.state);

        /*
        If not creating, we need to hydrate the comment fields
         */
        if (!this.state.creating) {
            props.getComment(props.commentId);
        }

        /*
        If params passed, this is an Edit; use the ID
        to get the required POST
         */
        // if (props.postId) {
        //     /* Async fetch for the supplied post id */
        //     props.getPost(props.postId);
        // }

    }

    // /**
    //  * Return true if Creating a NEW post
    //  * otherwise false
    //  * @returns {*}
    //  */
    // isCreating() {
    //     return this.state.creating;
    // }
    //
    // handleTitleChange(event) {
    //     this.setState({post: {...this.state.post, title: event.target.value}});
    // }
    //
    handleBodyChange(event) {
        this.setState({comment: {...this.state.comment, body: event.target.value}});
    }


    handleAuthorChange(event) {
        this.setState({comment: {...this.state.comment, author: event.target.value}});
    }
    //
    // handleCategoryChange(e) {
    //     this.setState({post : {...this.state.post, category: e.target.value}});
    // }

    /**
     * Async update of current state to server
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        const comment = this.state.comment;
        if (this.state.creating) {
            /*
            CREATE - Add a new ID and timestamp
             */
            const randomId = Math.random().toString(16).substr(2);
            const newComment = {...comment, id: randomId, timestamp: Date.now()};
            this.props.createComment(newComment);
        }
        else {
            /*
            UPDATE
             */
            this.props.updateComment(comment.id, comment.body);
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
        this.setState({comment: {...nextProps.comment}, creating: false});
    }

    render() {

        const props = this.props;
        const comment = this.state.comment;

        return (


            // id: Any unique ID. As with posts, UUID is probably the best here.
            //     timestamp: timestamp. Get this however you want.
            //     body: String
            // author: String
            // parentId: Should match a post id in the database.
            //

            <Form componentClass="fieldset" horizontal>
                <Row>
                    <Col xs={6}>
                        <h1>Comment</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>

                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Comment</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                <FormControl componentClass="textarea" rows={5} value={comment.body}
                                             onChange={this.handleBodyChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2}>
                                <ControlLabel>Author</ControlLabel>
                            </Col>
                            <Col xs={10}>
                                {this.state.creating ?
                                    <FormControl type="text" value={comment.author}
                                                 onChange={this.handleAuthorChange}/>
                                    :
                                    <Well>{comment.author}</Well>
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col xsOffset={2} xs={2}>
                                <Button type="submit" onClick={this.handleSubmit}
                                        bsStyle="primary">Submit</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Form>

        )
    }


    /*
            <Row>
                <Col xs={8}>
                    <Row>
                        <Col xs={2}>
                            <ControlLabel>Title</ControlLabel>
                        </Col>
                        <Col xs={10}>
                            <FormControl type="text" value={(!props.isLoading && post.title) || ''}
                                         onChange={this.handleTitleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <ControlLabel>Body</ControlLabel>
                        </Col>
                        <Col xs={10}>
                            <FormControl type="text" componentClass="textarea" rows={5}
                                         value={( post.body) || ''}
                                         onChange={this.handleBodyChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={2}>
                            <ControlLabel>Author</ControlLabel>
                        </Col>
                        <Col xs={10}>
                            {this.state.creating?
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
                                <FormControl componentClass="select"   value={post.category}
                                             onChange={this.handleCategoryChange}>
                                    {
                                        props.categories.map(
                                            val =>
                                                <option key={val.name} value={val.name}>{val.name}</option>

                                        )
                                    }
                                </FormControl>
                                :
                                <Well>{post.category}</Well>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col xsOffset={2} xs={2}>
                            <Button type="submit" onClick={this.handleSubmit} disabled={props.isLoading}
                                    bsStyle="primary">Submit</Button>

}
</Col>
<
    /Row>

</Col>

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
*/
}

const mapStateToProps = (state, ownProps) => {
    console.log('MAPPING!', ownProps,state.CreateEditCommentReducer);
    return {
        postId: ownProps.postId,
        comment: state.CreateEditCommentReducer.comment,
        // post: state.CreateEditViewReducer.post,
        // categories: state.DefaultReducer.categories,
        // isLoading: state.CreateEditViewReducer.isLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getComment: (commentId) => dispatch(getComment(commentId)),
    updateComment: (id, title, body) => dispatch(updateComment(id, title, body)),
    createComment: (comment) => dispatch(createComment(comment))
});


export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
