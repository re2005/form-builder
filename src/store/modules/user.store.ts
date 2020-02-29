import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { UserStoreTypes } from '@/types/userTypes';
import apiService from '@/services/api.service';

export const state: UserStoreTypes = {
    session: {}
};

const getters: GetterTree<UserStoreTypes, any> = {
    user: state => state.session.user
};

const mutations: MutationTree<UserStoreTypes> = {
    updateSession(state, v) {
        state.session = v;
    },
    updateUser(state, v) {
        state.session.user = v;
    },
    cleanSession(state) {
        state.session = {};
    }
};

const actions: ActionTree<UserStoreTypes, any> = {
    async updateSessionFromApi({ commit, state }) {
        const id = state.session.user.id;
        try {
            const { status, data } = await apiService.get('users/' + id);
            if (status === 200) {
                commit('updateUser', data);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }
};

export const userStoreModule: Module<UserStoreTypes, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
