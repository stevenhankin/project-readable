import {connect} from "react-redux";
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getComment, createComment, updateComment} from "../../../store/CommentActions";
import {Form, ControlLabel, FormControl, Button, Col, Row, Well} from 'react-bootstrap';


class CommentEdit extends Component {

    constructor(props) {
        super(props);

        /*
        If a Comment ID is NOT passed in,
        a new Comment is being created
         */
        this.state = {
            modifiedOK: false,
            comment: {
                id: props.commentId,
                body: "",
                author: '',
            }
        };
    }

    componentDidMount() {
        /*
        If not creating, we need to hydrate the comment fields
         */
        if (!this.isCreating()) {
            this.props.getComment(this.props.commentId);
        }
    }

    /*
    Return to previous page
     */
    handleCancel = ()  => {
            this.props.history.goBack();
    };

    handleBodyChange = (event) => {
        this.setState({comment: {...this.state.comment, body: event.target.value}});
    };

    handleAuthorChange = (event) => {
        this.setState({comment: {...this.state.comment, author: event.target.value}});
    };

    isCreating = () => {
        return !this.props.commentId;
    };

    /**
     * Async update of current state to server
     * Can Create or Update
     *
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const comment = this.state.comment;
        if (!this.isCreating()) {
            /*
            UPDATE
             */
            this.props.updateComment(comment);
        } else {

            /*
            CREATE - Add a new ID and timestamp
             */
            const randomId = Math.random().toString(16).substr(2);
            const newComment = {...comment, id: randomId, timestamp: Date.now(), parentId: this.props.parentId};
            this.props.createComment(newComment);
        }
    };


    /**
     * Redux will map received properties from the server
     * then they will be copied into Controlled Component state
     * for local handling; want to avoid continual updates to
     * server for optimal performance
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const r = nextProps.CommentReducer;
        const commentId = nextProps.commentId || r.newCommentId;
        this.setState({comment: r.comments[commentId], modified: r.modified});
        if (r.modified) {
            /*
            Post parent redirect after submitting a new or modified comment
            */
            const category = nextProps.PostReducer.posts[nextProps.parentId].category;
            nextProps.history.push(`/${category}/${nextProps.parentId}`);
        }
    }


    render() {
        const comment = this.state.comment;
        return (

            <Form componentClass="fieldset" horizontal>

                <Row>
                    <Col xs={6}>
                        <h2>Editing comment</h2>
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
                                {this.isCreating() ?
                                    <FormControl type="text" value={comment.author}
                                                 onChange={this.handleAuthorChange}/>
                                    :
                                    <Well>{comment.author}</Well>
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col xsOffset={2} xs={10}>
                                <Button type="submit" onClick={this.handleSubmit}
                                        disabled={comment.body.length === 0
                                        || comment.author.length === 0}

                                        bsStyle="primary">Submit</Button>
                                <Button bsStyle="warning" onClick={this.handleCancel}>Cancel</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Form>
        )
    }

}


const mapStateToProps = ({CommentReducer,PostReducer}) => ({CommentReducer,PostReducer});

export default withRouter(connect(mapStateToProps, {getComment, updateComment, createComment})(CommentEdit));
