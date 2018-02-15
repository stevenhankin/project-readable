import {CREATE_TOAST,REMOVE_TOAST} from './ToastActions'

export const reducer = (state = {toast: ""}, action) => {
    switch (action.type) {

        case CREATE_TOAST:
        case REMOVE_TOAST:
            return {...state, toast: action.toast, show:action.show};

        default:
            return state;
    }
};
