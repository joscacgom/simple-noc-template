import { EmailService } from "../../../presentation/email/emailService"
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogLevel } from "../entities/LogEntity";

interface ISendEmail {
    execute(to: string | string[] ): Promise<void>;
}

export class SendEmail implements ISendEmail {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    public async execute(to: string | string[] ): Promise<void> {
        try{
            await this.emailService.sendEmailWithAttachment(to);
            const log = new LogEntity(
                LogLevel.LOW,
                'Email successfully sent',
                'EmailService'
            );

            this.logRepository.saveLog(log);
        }
        catch(error){
              const log = new LogEntity(
                LogLevel.HIGH,
                'Email failed to send',
                'EmailService'
            );

            this.logRepository.saveLog(log);
        }

    }

}