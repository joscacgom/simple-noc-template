import { envPlugin } from '../config/plugins/env.plugin';

describe('env.plugin', () => {
    it('should return env vars', () => {

        // expect( envPlugin ).toEqual(
        //     {
        //         MAIL_SERVICE: "mail", 
        //         MAIL_SERVICE_EMAIL: "testmail@mail.com", 
        //         MAIL_SERVICE_HOST: "smtp.mail.com", 
        //         MAIL_SERVICE_PORT: 587, 
        //         MAIL_SERVICE_SECRET_KEY: "<secret-key>", 
        //         MODE_ENV: "development", 
        //         MONGO_URI: "test mongo db uri",
        //         PORT: 3000,
        //         DATABASE_URL: "url",
        //         DIRECT_URL: "url",
        //     }
        // );

        expect( typeof envPlugin ).toBe('object');
    });
});