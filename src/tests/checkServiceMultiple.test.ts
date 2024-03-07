import { CheckServiceMultiple } from "../domain/useCases/checks/checkServiceMultiple";


describe('checkService', () => {

    const mockRepositories = [
        {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        },
        {
            saveLog: jest.fn(),
            getLogs: jest.fn()    
        }
  ];
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(mockRepositories, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call successCallback when service is up', async () => {
        const url = 'http://www.google.com';
        await checkService.execute(url);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should call errorCallback when service is down', async () => {
        const url = 'http://www.google.com/notfound';
        await checkService.execute(url);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
    });
});