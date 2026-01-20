import { Page, request } from '@playwright/test';

interface ApiBody {
    "username": string;
    "password": string;
    "email": string;
    "firstName": string;
    "lastName": string;
}

class _AuthApi {
    constructor(private page: Page) { }

    apiBody(uName: string, pWord: string, eMail: string, fName: string, lName: string): ApiBody {
        return {
            "username": uName,
            "password": pWord,
            "email": eMail,
            "firstName": fName,
            "lastName": lName
        };
    }

    async registerCustomer(uName: string, pWord: string, eMail: string, fName: string, lName: string) {
        const body = this.apiBody(uName, pWord, eMail, fName, lName);

        const newUser = await this.page.request.post('/api/auth/register', {data: body});
        return newUser;
    }

    async registerStaff(uName: string, pWord: string, eMail: string, fName: string, lName: string) {
        const body = this.apiBody(uName, pWord, eMail, fName, lName);

        const newUser = await this.page.request.post('/api/auth/add-staff', {data: body});
        return newUser;
    }

    async loginCustomer(uName: string, pWord: string) {
        const body = { username: uName, password: pWord };

        const loginUser = await this.page.request.post('/api/auth/login', {data: body});
        return loginUser;
    }

    async cleanUp(uName: string) {
        const deleteUser = await this.page.request.delete(`/api/auth/cleanup/user/${uName}`);
    }

}

export const authApi = (page: Page) => new _AuthApi(page);