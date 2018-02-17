import React, {Component} from 'react';
import {removeToast} from "../../store/ToastActions";
import {connect} from "react-redux";
import {Alert} from 'react-bootstrap';

/**
 * Toast to raise an informational message to the
 * user which will cancel after a short time
 */
class Toast extends Component {

    render() {
        const props = this.props;
        const toast = props.ToastReducer;

        if (toast.show) {
            /**
             * If received new state and showing is enabled,
             * set a timeout to hide the Toast again in
             * a few seconds time
             */
            setTimeout(function () {
                console.log(props);
                props.removeToast();
            }, 2000);
        }

        return (
            <Alert bsStyle="warning" className="toast" hidden={!toast.show}>
                <strong>{toast.toast}</strong>
            </Alert>
        );
    }
}

const mapStateToProps = ({ToastReducer}) => ({ToastReducer});

export default connect(mapStateToProps, {removeToast})(Toast);
