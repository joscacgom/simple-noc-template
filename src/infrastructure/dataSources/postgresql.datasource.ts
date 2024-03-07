import { Log } from "../../data/mongo/models/log";
import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/useCases/entities/LogEntity";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export class PostgreSQLDatasource implements LogDataSource {

    public async saveLog(log: LogEntity): Promise<void> {
      await prismaClient.log.create({
        data: {
            level: LogLevel.LOW,
            message: log.message,
            origin: log.origin
        }
        });

    }

    public async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.log.findMany({
            where: {
                level: severityLevel
            }
        });
        return logs.map(log => new LogEntity(log.level as LogLevel, log.message, log.origin!, log.createdAt));
    }
}