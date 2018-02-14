import {CREATE_TOAST,REMOVE_TOAST} from './ToastActions'

export const reducer = (state = {toast: ""}, action) => {
    switch (action.type) {
        case CREATE_TOAST:
        case REMOVE_TOAST:
            console.log(action.type,{...state, toast: action.toast, show:action.show})
            return {...state, toast: action.toast, show:action.show};
        default:
            return state;
    }
};
