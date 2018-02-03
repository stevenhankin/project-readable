import React, {Component} from 'react';
import {getPost, updatePost} from "./actions";
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

class PostDetailView extends Component {

    constructor(props) {
        super(props);

        /*
        isLoading flag to prevent flicker.
        Set isLoading flag to suppress render of post
        in case a previous post is already in props.
         */
        this.state = {isLoading: true};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        /* Async fetch for the supplied post id */
        this.props.getPost(this.props.match.params.postId);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleBodyChange(event) {
        this.setState({body: event.target.value});
    }

    /**
     * Async update of current state to server
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
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
    }

    render() {
        const props = this.props;
        return (
            <section>
                <h1>Post</h1>

                <Form onSubmit={this.handleSubmit}>
                    {/*<FormGroup>*/}
                    {/*<ControlLabel>ID</ControlLabel>*/}
                    {/*<p>{this.state.id}</p>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl type="text" value={(!props.isLoading && this.state.title) || ''}
                                     onChange={this.handleTitleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Body</ControlLabel>
                        <FormControl type="text" componentClass="textarea"
                                     value={(!props.isLoading && this.state.body) || ''}
                                     onChange={this.handleBodyChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Author</ControlLabel>
                        <p>{this.state.author}</p>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Category</ControlLabel>
                        <p>{this.state.category}</p>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Vote Score</ControlLabel>
                        <p>{this.state.voteScore}</p>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Deleted</ControlLabel>
                        <p>{this.state.deleted}</p>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Comment Count</ControlLabel>
                        <p>{this.state.commentCount}</p>
                    </FormGroup>
                    <Button type="submit" disabled={props.isLoading} bsStyle="primary">Submit</Button>
                </Form>

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
