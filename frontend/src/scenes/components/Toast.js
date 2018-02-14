import React, {Component} from 'react';
import * as action from "../../store/ToastActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';

/**
 * Toast to raise an informational message to the user
 * which will cancel after a short time
 */
class Toast extends Component {
    constructor(props) {
        super(props);

        setTimeout(function () {
            props.removeToast();
        }, 2000);

    }

    render() {
        return (
            <Alert bsStyle="warning" hidden={!this.props.toast}>
                <strong>{this.props.toast}</strong>
            </Alert>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {toast: state.ToastReducer.toast}
};

const mapDispatchToProps = dispatch => ({
    removeToast: (id) => dispatch(action.removeToast(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
