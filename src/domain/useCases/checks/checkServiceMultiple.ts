import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogLevel } from '../entities/LogEntity';

interface ICheckService {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements ICheckService {

   constructor(
         private readonly LogRepository: LogRepository[],
         private readonly successCallback: SuccessCallback,
         private readonly errorCallback: ErrorCallback
   ) {}
   public async execute( url: string): Promise<boolean> {
        try{

            const response = await fetch(url);

            if(!response.ok) throw new Error('Error fetching url');

            this.LogRepository.forEach(logRepository => {
                logRepository.saveLog( new LogEntity(LogLevel.LOW, `Service ${url} is up`, 'checkService'));
            })

            this.successCallback && this.successCallback();
            return true;
        }
        catch(e){

            this.LogRepository.forEach(logRepository => {
                logRepository.saveLog( new LogEntity(LogLevel.HIGH, `Service ${url} is down`, 'checkService'));
            })
            
            this.errorCallback && this.errorCallback(`${e}`);
            return false;
        }
    }
}