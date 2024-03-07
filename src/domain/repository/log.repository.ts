import { LogEntity, LogLevel } from "../useCases/entities/LogEntity";


export abstract class LogRepository {
    public abstract saveLog(log: LogEntity): Promise<void>;
    public abstract getLogs( severityLevel: LogLevel): Promise<LogEntity[]>;
}