import mongoose from "mongoose";
import { MongoDB } from "../data/mongo";
import { MongoDatasource } from "../infrastructure/dataSources/mongo.datasource";
import { LogEntity, LogLevel } from "../domain/useCases/entities/LogEntity";
import { Log } from "../data/mongo/models/log";


describe('MongoDataSource', () => {

    const LogDataSource = new MongoDatasource();
    const log = new LogEntity(LogLevel.LOW, 'message', 'origin', new Date());
    
      beforeAll(async () => {
        await MongoDB.connect(
            {
                URI: process.env.MONGO_URI!,
                dbName: process.env.MONGO_DB_NAME!
            }
        );
      });

      afterEach(async () => {
        await Log.deleteMany();
       });
      
       afterAll(async () => {
            await mongoose.connection.close();
       });

        it('should save to database', async () => {
            const logSpy = jest.spyOn(LogDataSource, 'saveLog');

            await LogDataSource.saveLog(log);
            
            expect(logSpy).toHaveBeenCalled();
           
        });

        it('should get logs from database', async () => {
            await LogDataSource.saveLog(log);

            const logs = await LogDataSource.getLogs(LogLevel.LOW);
            expect(logs.length).toBeGreaterThan(0);
        });
  
    
});