import authService from '@/services/auth.service';

const healthService = {

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async check(): Promise<any> {
        const { status } = await authService.getInfo();

        // TODO Implement custom detailed information about the problem
        const timeOut = status === 404 ? 30000 : 5000;
        await this.sleep(timeOut);
        this.check();
    }
};

export default healthService;
