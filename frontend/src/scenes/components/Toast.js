import React, {Component} from 'react';
import * as action from "../../store/ToastActions";
import {connect} from "react-redux";
import {Alert} from 'react-bootstrap';

/**
 * Toast to raise an informational message to the
 * user which will cancel after a short time
 */
class Toast extends Component {

    render() {
        const props = this.props;

        if (props.show) {
            /**
             * If received new state and showing is enabled,
             * set a timeout to hide the Toast again in
             * a few seconds time
             */
            setTimeout(function () {
                props.removeToast();
            }, 2000);
        }

        return (
            <Alert bsStyle="warning" className="toast" hidden={!props.show}>
                <strong>{props.toast}</strong>
            </Alert>
        );
    }
}


const mapStateToProps = (state) => {
    return {toast: state.ToastReducer.toast, show: state.ToastReducer.show}
};

const mapDispatchToProps = dispatch => ({
    removeToast: (id) => dispatch(action.removeToast(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
