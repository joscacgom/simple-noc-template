import { LogEntity, LogLevel } from "../domain/useCases/entities/LogEntity";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";


describe('LogRepository', () => { 
    
    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const logRepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save and call datasource', async () => {
        const log = new LogEntity(LogLevel.LOW, 'message', 'origin', new Date());
        await logRepository.saveLog(log);
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
       
    });

    it('should get logs and call datasource', async () => {
        await logRepository.getLogs(LogLevel.LOW);
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogLevel.LOW);
    });

});