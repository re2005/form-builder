import authService from '@/services/auth.service';
import apiService from '@/services/api.service';
import { cookieHelper } from '@/helpers/cookie.helper';

describe('Tests Auth Service', () => {
    beforeEach(() => {
        cookieHelper.get = jest.fn(() => 'abc');
    });

    it('Should return Promise with user authenticated', async () => {
        apiService.get = jest.fn(() => Promise.resolve({ status: 200, data: { id: '123' } }));
        authService.setSessionAndUser = jest.fn();
        const resp = await authService.isAuthenticated();
        expect(cookieHelper.get).toBeCalledWith('session');
        expect(apiService.get).toBeCalledWith('sessions/abc');
        expect(authService.setSessionAndUser).toBeCalledWith({ id: '123' });
        expect(resp).toBeTruthy();
    });

    it('Should return rejected Promise with failed authentication', async () => {
        apiService.get = jest.fn(() => Promise.resolve(new Error('User is not authenticated')));
        expect(apiService.get).toHaveBeenCalledTimes(0);
        const resp = await authService.isAuthenticated();
        expect(resp).toBeFalsy();
    });

    it('Should return Promise with user not authenticated', async () => {
        apiService.get = jest.fn(() => Promise.resolve({ status: 401 }));
        expect(apiService.get).toHaveBeenCalledTimes(0);
        const resp = await authService.isAuthenticated();
        expect(resp).toBeFalsy();
    });

    it('Should post input login information to the correct url & data', async () => {
        apiService.post = jest.fn(() => Promise.resolve({ status: 201, data: { id: 123 } }));
        authService.setSessionAndUser = jest.fn();
        const url = 'sessions';
        const login = {
            email: 'user@fir24.com',
            password: '123456',
            captcha_response: 'abc'
        };
        await authService.login(login);
        expect(apiService.post).toBeCalledWith(url, login);
        expect(authService.setSessionAndUser).toBeCalledWith({ id: 123 });
    });
});
