import { IDataService } from "../Data/DataService/IDataService";
import { BackendDataService } from "../Server/ServerDataService";

export const backendDataService: IDataService = new BackendDataService();
