import { LogDataSource } from "../domain/dataSources/log.datasource";
import { LogEntity, LogLevel } from "../domain/useCases/entities/LogEntity";


describe('logDatasource', () => {
        
        const log = new LogEntity(LogLevel.LOW, 'test message', 'test', new Date());

        class MockLogDataSource extends LogDataSource {
            public async saveLog(log: LogEntity): Promise<void> {
                return;
            }
            public async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
                return [log];
            }
        }
        
        it(' should test abstract class ', async () => {
                const mockLogDataSource = new MockLogDataSource();

                expect( mockLogDataSource ).toBeInstanceOf(LogDataSource);
                expect(  mockLogDataSource ).toHaveProperty('saveLog');
                expect(  mockLogDataSource ).toHaveProperty('getLogs');
            });

});