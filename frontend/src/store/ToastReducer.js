import {CREATE_TOAST,REMOVE_TOAST} from './ToastActions'

export const reducer = (state = {toast: ""}, action) => {
    switch (action.type) {
        case CREATE_TOAST:
            return {...state, toast: action.toast};

        case REMOVE_TOAST:
            return {};

        default:
            return state;
    }
};
