import { SnackbarProgrammatic, ToastProgrammatic } from 'buefy';

const alertService = {

    async dialogDangerMessage(message: string) {
        SnackbarProgrammatic.open({
            message: message,
            type: 'is-danger',
            position: 'is-top',
            actionText: 'Retry',
            indefinite: true,
            onAction: async () => {
                this.successMessage('Action pressed');
            }
        });
    },

    dangerMessage(message: string, duration?: number) {
        this.openToast('is-danger', message, duration);
    },

    successMessage(message: string, duration?: number) {
        this.openToast('is-success', message, duration);
    },

    openToast(type: string, message: string, duration = 5000) {
        ToastProgrammatic.open({
            message: message,
            type: type,
            duration: duration
        });
    }
};

export default alertService;
