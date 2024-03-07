import { Log } from "../../data/mongo/models/log";
import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/useCases/entities/LogEntity";

export class MongoDatasource implements LogDataSource {

    public async saveLog(log: LogEntity): Promise<void> {
        const newLog = await Log.create({ 
            message: log.message,
            level: LogLevel.LOW,
            createdAt: new Date(),
            origin: log.origin
        });

        await newLog.save();

    }

    public async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
        const logs = await Log.find({ level: severityLevel });
        return logs.map(log => new LogEntity(log.level as LogLevel, log.message, log.origin!, log.createdAt));
    }
}