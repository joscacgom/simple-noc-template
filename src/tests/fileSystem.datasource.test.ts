import { LogEntity, LogLevel } from "../domain/useCases/entities/LogEntity";
import { Log } from "../data/mongo/models/log";
import { FileSystemDatasource } from "../infrastructure/dataSources/fileSystem.datasource";
import fs from 'fs';
import { LogDataSource } from '../domain/dataSources/log.datasource';


describe('FileSystemDataSource', () => {

        const LogDataSource = new FileSystemDatasource();
        const log = new LogEntity(LogLevel.LOW, 'message', 'origin', new Date());
        
        beforeAll(() => {
            if (!fs.existsSync('logs')) {
                fs.mkdirSync('logs');
            } else {
                fs.rmdirSync('logs', { recursive: true });
            }
        });

        afterAll(() => {
            fs.rmdirSync('logs', { recursive: true });
        });

        it('should save to fs if they do not exist', async () => {
            new FileSystemDatasource();
            const files = fs.readdirSync('logs');
            expect(files.length).toBe(3);
           
        });


        it('should save to fs', async () => {
           const log = new LogEntity(LogLevel.LOW, 'message', 'origin', new Date());
           await LogDataSource.saveLog(log);

           const content= fs.readFileSync('logs/logs-low-severity.log', 'utf-8');

           expect(content).toContain(log.message);

        });

        it('should get logs from fs', async () => {
            const log = new LogEntity(LogLevel.LOW, 'message', 'origin', new Date());
            await LogDataSource.saveLog(log);
            const logs = await LogDataSource.getLogs(LogLevel.LOW);
            
            expect(logs.length).toBeGreaterThan(0);
        });

        it('should not throw error if logs exist', async () => {
            new FileSystemDatasource();
            new FileSystemDatasource();
            expect(true).toBe(true);
        });

        it('should throw error if log level is invalid', async () => {
            try {
                await LogDataSource.getLogs('invalid' as LogLevel);
            } catch (error) {
                expect(`${error}`).toBe('Error: Invalid log level');
            }
        });
    
});