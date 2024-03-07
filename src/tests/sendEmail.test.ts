import { LogRepository } from "../domain/repository/log.repository";
import { SendEmail } from "../domain/useCases/email/sendEmail";
import { EmailService } from "../presentation/email/emailService";


describe('sendEmail', () => {

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithAttachment: jest.fn()
    } as any;

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    } as LogRepository;

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should send an email', async () => {

        const sendEmail = new SendEmail(mockEmailService, mockLogRepository);
        await sendEmail.execute('mail@mail.com');
        expect(mockEmailService.sendEmailWithAttachment).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalled();
        
    });

    it('should log error when email fails to send', async () => {
        mockEmailService.sendEmailWithAttachment.mockRejectedValue(new Error('Email failed to send'));
        const sendEmail = new SendEmail(mockEmailService, mockLogRepository);
        await sendEmail.execute('mail@mail.com');
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            {
                createdAt: expect.any(Date),
                level: 'HIGH',
                message: 'Email failed to send',
                origin: 'EmailService'
            }

        );
    });

});