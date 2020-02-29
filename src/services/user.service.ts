import apiService from '@/services/api.service';
import { UserTypes } from '@/types/userTypes';
import store from '@/store';

const userService = {

    async updateUser(userData: UserTypes | any): Promise<any> {
        const id = store.state.userStoreModule.session.user.id;
        if (!id) return Promise.reject(Error);
        try {
            return await apiService.post('users/' + id, userData);
        } catch (e) {
            // TODO logger interface for errors/exceptions
            console.warn('Error trying to update user data: ', e);
            return Promise.reject(e);
        }
    },

    async getUserData(): Promise<UserTypes> {
        const id = store.state.userStoreModule.session.user.id;
        if (!id) return Promise.reject(Error);
        try {
            const { data } = await apiService.get('users/' + id);
            return data;
        } catch (e) {
            return Promise.reject(e);
        }
    }
};

export default userService;
