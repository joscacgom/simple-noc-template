import { EmailService } from "../presentation/email/emailService";
import nodemailer from 'nodemailer';

describe('EmailService', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService( );


    it('should send an email', async() => {
        try{
            await emailService.sendEmail('mail@mail.com', 'Test', '<h1>Test</h1>');
            expect(mockSendMail).toHaveBeenCalled();
        }catch(e){
            expect(false).toBe(true)
        }
    });

    it('should send an email with attachment', async() => {
        try{
            await emailService.sendEmailWithAttachment('mail@mail.com');   
            expect(mockSendMail).toHaveBeenCalled();
        }catch(e){
            expect(false).toBe(true)
        }
    });

});