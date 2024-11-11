import { ContentfulDataService } from "../Contentful/ContentfulDataService";
import { IDataService } from "../DataService/IDataService";

export const dataService: IDataService = new ContentfulDataService();
