import store from '@/store';
import apiService from '@/services/api.service';
import { cookieHelper } from '@/helpers/cookie.helper';
import { LoginInterface } from '@/types/api.types';
import { SessionTypes } from '@/types/userTypes';
import router from '@/router';

const authService = {

    async isAuthenticated(): Promise<any> {
        const id = cookieHelper.get('session');
        if (!id) return Promise.resolve(false);
        try {
            const { status, data } = await apiService.get('sessions/' + id);
            if (status === 200) {
                this.setSessionAndUser(data);
            }
            return status === 200;
        } catch (e) {
            // TODO logger interface for errors/exceptions
            console.log('Error trying to login with current ID: ', id);
            return Promise.reject(e);
        }
    },

    async getInfo(): Promise<any> {
        try {
            return await apiService.get('info');
        } catch (e) {
            return Promise.reject(e);
        }
    },

    hasLocalSession() {
        return true;
        // use cookie service in the future cookieHelper.get('session');
    },

    setSessionAndUser(d: SessionTypes) {
        cookieHelper.set('session', d.id);
        store.commit('userStoreModule/updateSession', d);
    },

    async logout(): Promise<any> {
        const id = cookieHelper.get('session');
        try {
            await apiService.delete('sessions/' + id);
            cookieHelper.delete('session');
        } catch (e) {
            console.log('Error logging out', e);
        } finally {
            await router.push({ name: 'login' });
            store.commit('userStoreModule/cleanSession');
        }
    },

    async login(d: LoginInterface): Promise<any> {
        try {
            const { status, data } = await apiService.post('sessions', d);
            if (status === 201) {
                this.setSessionAndUser(data);
            }
            return { status, data };
        } catch (e) {
            console.log('error', e);
        }
    }
};

export default authService;
