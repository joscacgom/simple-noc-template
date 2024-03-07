import mongoose from "mongoose";

interface ConnectionOptions {
    URI: string;
    dbName: string;
}

export class MongoDB {

    static async connect(options: ConnectionOptions) {
       const { URI, dbName } = options;

       try{

        await mongoose.connect(URI, {
           dbName,
        });

        return true
        
       }catch(e){
            throw new Error(`${e}`);
       }
    }
}