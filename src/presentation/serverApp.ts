import { CheckService } from "../domain/useCases/checks/checkService";
import { CheckServiceMultiple } from "../domain/useCases/checks/checkServiceMultiple";
import { SendEmail } from "../domain/useCases/email/sendEmail";
import { FileSystemDatasource } from "../infrastructure/dataSources/fileSystem.datasource";
import { MongoDatasource } from "../infrastructure/dataSources/mongo.datasource";
import { PostgreSQLDatasource } from "../infrastructure/dataSources/postgresql.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cronService";
import { EmailService } from "./email/emailService";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoDatasource());
const postgreSQLLogRepository = new LogRepositoryImpl(new PostgreSQLDatasource());

const emailService = new EmailService();

export class ServerApp {
   constructor() {}

   public static start() {
        console.log('ServerApp started');
        const url = 'https://www.google.com';

       // new SendEmail(emailService, fileSystemLogRepository).execute('toAddress@mail.com');

        const job = CronService.createJob(
            '*/5 * * * * *',
            () => {
               new CheckServiceMultiple(
                     [fileSystemLogRepository, mongoLogRepository, postgreSQLLogRepository],
                     () => console.log(`${url} is up`),
                     (error) => console.error(error)
               ).execute(url)
            }
        );
    }
}