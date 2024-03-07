import { LogDataSource } from '../../domain/dataSources/log.datasource';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogLevel } from '../../domain/useCases/entities/LogEntity';


export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logDataSource: LogDataSource) {
        
    }

    public async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log);
    } 
      
    public async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }
}