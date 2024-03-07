import { LogEntity, LogLevel } from "../domain/useCases/entities/LogEntity";


describe('LogEntity', () => {
    it('should create a log entity', () => {
        const log = new LogEntity(LogLevel.HIGH, 'message', 'origin');
        expect(log.level).toBe(LogLevel.HIGH);
        expect(log.message).toBe('message');
        expect(log.origin).toBe('origin');
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});