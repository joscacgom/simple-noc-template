
export enum LogLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export class LogEntity {
    
    public level: LogLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(level: LogLevel, message: string, origin: string, createdAt: Date = new Date()) {
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

}