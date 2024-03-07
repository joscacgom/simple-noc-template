import { LogEntity, LogLevel } from "../useCases/entities/LogEntity";


export abstract class LogDataSource {
    public abstract saveLog(log: LogEntity): Promise<void>;
    public abstract getLogs( severityLevel: LogLevel): Promise<LogEntity[]>;
}