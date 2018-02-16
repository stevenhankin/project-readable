import {CREATE_TOAST, REMOVE_TOAST} from './types';

export const removeToast = () => ({
    type: REMOVE_TOAST,
    show: false
});

/**
 * Create a toast to inform user of result of an action (e.g. successfully created post)
 *
 * @param msg
 * @returns {{type: string, toast: *}}
 */
export const createToast = (msg) => ({
    type: CREATE_TOAST,
    toast: msg,
    show: true
});


