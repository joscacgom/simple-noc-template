import mongoose from "mongoose";
import { MongoDB } from "../data/mongo";


describe('init mongodb connection', () => {

    afterAll(()=>{
        mongoose.connection.close();
    })
    
    it('should return mongodb connection', async () => {
        const isConnected = await MongoDB.connect({
            URI: process.env.MONGO_URI as string,
            dbName: 'test'
        });

        expect( isConnected ).toBeTruthy();
    });

    it('should return error', async () => {
        try{
            await MongoDB.connect({
                URI: 'wrong uri',
                dbName: 'test'
            });

            expect( true ).toBeFalsy();

        }catch(e){
            expect( true ).toBeTruthy();
        }
    });
});