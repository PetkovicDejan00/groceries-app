import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successPopup = (message) => {
    toast.success(`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
})};

const errorPopup = (message) => {
    toast.error(`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
})};

export {errorPopup, successPopup}