import axios from 'axios';
import alertService from '@/services/alert.service';
import authService from '@/services/auth.service';

axios.defaults.withCredentials = true;

const handledErrors = [401, 403, 404];

export function errorHandler(error?: any) {
    if (!error.response) {
        let message;
        let type;
        if (window.navigator.onLine) {
            message = 'API is not responding, please try again in a few moments';
            type = 'API';
            alertService.dangerMessage(message, 30000);
        } else {
            message = 'Seems that you have no internet connection at this moment';
            type = 'CONNECTION';
            alertService.dangerMessage(message, 30000);
        }
        return { status: 404, data: message, type: type };
    }

    if (handledErrors.includes(error.response.status)) {
        const message = error.response.data.message;

        if (error.response.status === 401) {
            authService.logout();
            // If API returns 401...
        }
        alertService.dangerMessage(message);
        return { status: error.response.status, data: message };
    }
    return error;
}

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return errorHandler(error);
});

export default axios;
