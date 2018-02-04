import React, {Component} from 'react';
import {getPost, updatePost} from "./actions";
import {Form, FormGroup, ControlLabel, FormControl, Button, Badge, Col, Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';

class PostDetailView extends Component {

    constructor(props) {
        super(props);

        /*
        isLoading flag to prevent flicker.
        Set isLoading flag to suppress render of post
        in case a previous post is already in props.
         */
        this.state = {isLoading: true, editing: false};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editPost = this.editPost.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);

        /* Async fetch for the supplied post id */
        this.props.getPost(this.props.match.params.postId);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleBodyChange(event) {
        this.setState({body: event.target.value});
    }

    editPost() {
        this.setState({editing: true});
    }

    cancelEdit() {
        this.setState({editing: false});
    }

    /**
     * Async update of current state to server
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        console.log('SUBMIT!');
        this.props.putPost(this.state.id, this.state.title, this.state.body);
    }

    /**
     * Redux will map received properties from the server
     * then they will be copied into Controlled Component state
     * for local handling; want to avoid continual updates to
     * server for optimum performance
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps.post});
        this.setState({editing: false});
    }

    render() {
        const props = this.props;
        return (
            <section>

                <Form componentClass="fieldset" horizontal>
                    <Row>
                        <Col xs={12}>
                        <h1>Post
                            <span className="myFormControl">
                            {this.state.editing ?
                                <span><Button type="submit" onClick={this.handleSubmit} disabled={props.isLoading} bsStyle="primary">Submit</Button>
                                    <Button bsStyle="warning" onClick={this.cancelEdit}>Cancel</Button></span>
                                :
                                <a onClick={this.editPost}>
                                    <small><span className="glyphicon glyphicon-edit"/></small>
                                </a>
                            }
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
                                        {this.state.editing ?
                                            <FormControl type="text" value={(!props.isLoading && this.state.title) || ''}
                                                         onChange={this.handleTitleChange}/>
                                            :
                                            <Well bsSize="small">{this.state.title}</Well>
                                        }
                                    </Col>
                                </FormGroup>
                        </Row>
                        <Row>
                                <FormGroup>
                                    <Col xs={1}>
                                        <ControlLabel>Body</ControlLabel>
                                    </Col>
                                    <Col xs={11}>
                                        {this.state.editing ?
                                            <FormControl type="text" componentClass="textarea"
                                                         value={(!props.isLoading && this.state.body) || ''}
                                                         onChange={this.handleBodyChange}/>
                                            :
                                            <Well>{this.state.body}</Well>
                                        }
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
                                        <Well bsSize="small">{this.state.author}</Well>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col xs={6}>
                                        <ControlLabel>Category</ControlLabel>
                                    </Col>
                                    <Col xs={6}>
                                        <Well bsSize="small">{this.state.category}</Well>
                                    </Col>
                                </FormGroup>
                        </Row>

                        <Row>
                                <FormGroup>
                                    <Col xs={6}>
                                        <ControlLabel>Vote Score</ControlLabel>
                                    </Col>
                                    <Col xs={2}>
                                        <p><Badge>{this.state.voteScore}</Badge></p>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={6}>
                                        <ControlLabel>Comment Count</ControlLabel>
                                    </Col>
                                    <Col xs={2}>
                                        <p><Badge>{this.state.commentCount}</Badge></p>
                                    </Col>
                                </FormGroup>
                        </Row>
                    </Col>



                </Form>

                <h1>Comments</h1>
                <section>

                </section>

            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {post: state.post, isLoading: state.isLoading}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId)),
    putPost: (id, title, body) => dispatch(updatePost(id, title, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
