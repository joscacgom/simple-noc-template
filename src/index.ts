import { ServerApp } from "./presentation/serverApp";
import { MongoDB } from "./data/mongo";
import { envPlugin } from "./config/plugins/env.plugin";

(async() => {
   main();
})();

async function main() {
    await MongoDB.connect({ URI: envPlugin.MONGO_URI, dbName: 'Logs'});
    

    ServerApp.start();
}