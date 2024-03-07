import { CronService } from "../presentation/cron/cronService";


describe('CronService', () => {

    const mockTick = jest.fn();

    it('should create a cron job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick);
        
        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done()
        }, 2000);
    });
});