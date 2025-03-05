import { GenericService } from "../genericService/genericService";
import {
  InputStockTransactionRequest,
  OutputStockTransactionRequest,
} from "./dto";

export class IStockTransactionService extends GenericService {
  createInput = async (data: InputStockTransactionRequest) => {
    return await this.getApi().post(`${this.getURL()}/input`, data);
  };
  updateInput = async (
    transactionId: string,
    data: InputStockTransactionRequest
  ) => {
    return await this.getApi().put(
      `${this.getURL()}/input/${transactionId}`,
      data
    );
  };
  createOutput = async (data: OutputStockTransactionRequest) => {
    return await this.getApi().post(`${this.getURL()}/output`, data);
  };
  updateOutput = async (
    transactionId: string,
    data: OutputStockTransactionRequest
  ) => {
    return await this.getApi().put(
      `${this.getURL()}/output/${transactionId}`,
      data
    );
  };
  cancel = async (transactionId: string) => {
    return await this.getApi().put(
      `${this.getURL()}/${transactionId}/cancel`,
      {}
    );
  };
}

export const StockTransactionService = new IStockTransactionService(
  "/stock-transaction"
);
