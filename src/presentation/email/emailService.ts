import nodemailer from 'nodemailer';
import { envPlugin } from '../../config/plugins/env.plugin';

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transport = nodemailer.createTransport({
        host: envPlugin.MAIL_SERVICE_HOST,
        port: envPlugin.MAIL_SERVICE_PORT,
        secure: false,
        auth: {
            user: envPlugin.MAIL_SERVICE_EMAIL,
            pass: envPlugin.MAIL_SERVICE_SECRET_KEY
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    constructor(){}

    public async sendEmail(to: string | string[], subject: string, html: string, attachments: Attachment[] = [] ): Promise<void> {
        try{

            await this.transport.sendMail({
                from: envPlugin.MAIL_SERVICE_EMAIL,
                to,
                subject,
                html,
                attachments: attachments
            });     

        }catch(error){
            throw new Error('Email failed to send');
        }
        
    }

    public async sendEmailWithAttachment(to: string | string[] ): Promise<void> {
       const subject = 'Server Logs';
       const html = `
                <h1>Logs</h1>
                <p>Logs</p>
         `;
       const attachments: Attachment[] = [
            {
                filename: 'logs-low-severity.log',
                path: './logs/logs-low-severity.log'
            }
        ];

        await this.sendEmail(to, subject, html, attachments);
    }
}