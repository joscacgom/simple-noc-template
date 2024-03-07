import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/useCases/entities/LogEntity";
import fs from 'fs';

export class FileSystemDatasource implements LogDataSource {

    private readonly logFolderPath = 'logs/';
    private readonly logsLowSeverityFileName = 'logs-low-severity.log';
    private readonly logsMediumSeverityFileName = 'logs-medium-severity.log';
    private readonly logsHighSeverityFileName = 'logs-high-severity.log';

    constructor() {
        this.createLogFiles();
    }

    private createLogFiles(): void {
        if(!fs.existsSync(this.logFolderPath)) {
            fs.mkdirSync(this.logFolderPath);
        }

        [this.logsLowSeverityFileName, this.logsMediumSeverityFileName, this.logsHighSeverityFileName].forEach(fileName => {
            if(!fs.existsSync(this.logFolderPath + fileName)) {
                fs.writeFileSync(this.logFolderPath + fileName, '');
            }
        });
    }

    private getFileName(severity: LogLevel): string {
        switch(severity) {
            case LogLevel.LOW:
                return this.logsLowSeverityFileName;
            case LogLevel.MEDIUM:
                return this.logsMediumSeverityFileName;
            case LogLevel.HIGH:
                return this.logsHighSeverityFileName;
            default:
                throw new Error('Invalid log level');
        }
    }

    public async saveLog(log: LogEntity): Promise<void> {
        fs.appendFileSync(this.logFolderPath + this.getFileName(log.level), JSON.stringify(log) + '\n');
    }

    public async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
        return fs.readFileSync(this.logFolderPath + this.getFileName(severityLevel), 'utf-8')?.trim().split('\n').map(line => 
            {   
                const { message, level, createdAt, origin} = JSON.parse(line);
                const log = new LogEntity(level, message, origin)
                log.createdAt = new Date(createdAt);
                return log;
            });
    }
}