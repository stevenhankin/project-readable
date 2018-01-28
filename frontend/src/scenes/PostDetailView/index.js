import React, {Component} from 'react';
import {getPost} from "./actions";
// import {store} from '../../store';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';

class PostDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {id: 'hi', loading: true};
        this.handleIdChange = this.handleIdChange.bind(this);
    }


    componentDidMount() {
        const postId = this.props.match.params.post;
        this.props.getPost(postId);
    }

    componentWillMount() {
        console.log('componentWillMount');
    }


    handleIdChange(event) {
        this.setState({id: event.target.value});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleBodyChange(event) {
        this.setState({body: event.target.value});
    }

    render() {
        // const post = Object.assign(store.getState().post);
        const props = this.props;// || {id:''};
        return (
            <section>
                <h1>Post</h1>

                {props.id === this.props.match.params.post &&

                <Form >
                    <FormGroup>
                        <ControlLabel>ID</ControlLabel>
                        {/*<FormControl type="text" defaultValue={props.id} disabled onChange={this.handleIdChange}/>*/}
                        <p>{props.id}</p>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl type="text" value={props.title} onChange={this.handleTitleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Body</ControlLabel>
                        <FormControl type="text" value={props.body} onChange={this.handleBodyChange}/>
                    </FormGroup>
                </Form>

                }

                {/*id(pin): "6ni6ok3ym7mf1p33lnez"*/}
                {/*timestamp(pin): 1468479767190*/}
                {/*title(pin): "Learn Redux in 10 minutes!"*/}
                {/*body(pin): "Just kidding. It takes more than 10 minutes to learn technology."*/}
                {/*author(pin): "thingone"*/}
                {/*category(pin): "redux"*/}
                {/*voteScore(pin): -5*/}
                {/*deleted(pin): false*/}
                {/*commentCount(pin): 0*/}

            </section>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {...state.post, loading: state.loading}
};

const mapDispatchToProps = dispatch => ({
    getPost: (postId) => dispatch(getPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
