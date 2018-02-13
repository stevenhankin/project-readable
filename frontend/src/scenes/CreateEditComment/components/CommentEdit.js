import {connect} from "react-redux";
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getComment, createComment, updateComment} from "../../../store/CommentActions";
import {Alert, Form, ControlLabel, FormControl, Button, Col, Row, Well} from 'react-bootstrap';


class CommentEdit extends Component {

    constructor(props) {
        super(props);

        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isCreating = this.isCreating.bind(this);

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

        /*
        If not creating, we need to hydrate the comment fields
         */
        if (!this.isCreating()) {
            props.getComment(props.commentId);
        }
    }

    handleBodyChange(event) {
        this.setState({comment: {...this.state.comment, body: event.target.value}});
    }

    handleAuthorChange(event) {
        this.setState({comment: {...this.state.comment, author: event.target.value}});
    }

    isCreating() {
        return this.props.commentId ? false : true;
    }

    /**
     * Async update of current state to server
     * Can Create or Update
     *
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        const comment = this.state.comment;
        console.log('SUBMIT - comment id is ', this.props.commentId, 'with comment', comment);
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
    }


    /**
     * Redux will map received properties from the server
     * then they will be copied into Controlled Component state
     * for local handling; want to avoid continual updates to
     * server for optimal performance
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState({comment: {...nextProps.comment}, modifiedOK: nextProps.modifiedOK});
    }


    render() {
        const props = this.props;
        const comment = this.state.comment;

        console.log('props?', props);
        if (this.state.modifiedOK) {
            /*
          Homepage redirect after a few seconds
           */
            console.log('SETTING TIMEOUT!!',this.state.modifiedOK)
            setTimeout(function () {
                console.log(`/post/view/${props.parentId}`);
                props.history.push(`/post/view/${props.parentId}`);
            }, 2000);
            return (
                <Alert bsStyle="warning">
                    <strong>Updated comment</strong> Redirecting to original post..
                </Alert>
            )
        }

        return (

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
                                {this.isCreating() ?
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

}

const mapStateToProps = (state, ownProps) => {
    console.log('ownProps will now be', ownProps)
    return {
        parentId: ownProps.parentId,
        commentId: ownProps.commentId,
        comment: state.CommentReducer.comment,
        modifiedOK: state.CommentReducer.modifiedOK
    }
};

const mapDispatchToProps = dispatch => ({
    getComment: (commentId) => dispatch(getComment(commentId)),
    updateComment: (id, title, body) => dispatch(updateComment(id, body)),
    createComment: (comment) => dispatch(createComment(comment))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit));
