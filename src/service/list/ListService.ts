import { AxiosResponse } from "axios";
import { apiRequest } from "../interceptor";
import { IListRecord } from "./ListModel";

class ListService {
  getListOptions = async (
    listName: string
  ): Promise<AxiosResponse<IListRecord[]>> => {
    return await apiRequest.get(`lists/${listName}`);
  };
}

export const listService = new ListService();
