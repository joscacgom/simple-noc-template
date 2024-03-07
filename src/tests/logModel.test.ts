import mongoose from "mongoose";
import { MongoDB } from "../data/mongo";
import { Log } from "../data/mongo/models/log";

describe('logModel', () => {

    beforeAll(async ()=>{
        await MongoDB.connect({
            URI: process.env.MONGO_URI as string,
            dbName: 'test'
            });
    })

    afterAll(()=>{
        mongoose.connection.close();
    })

    it(' should create log model ', async () => {
            
            const log = {
                message: 'test message',
                level: 'LOW',
                origin: 'test',
            };
    
            const savedLog = await Log.create(log);
    
            expect( savedLog ).toEqual(
                expect.objectContaining(
                    {
                        id: expect.any(String),
                        message: 'test message',
                        level: 'LOW',
                        origin: 'test',
                        createdAt: expect.any(Date),
                    }
                )
            );
    
        });
});