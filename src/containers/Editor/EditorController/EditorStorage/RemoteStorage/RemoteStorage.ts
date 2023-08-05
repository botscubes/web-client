export default class RemoteStorage {
  private sync: boolean;
  private errorHandler: (message: string) => void;
  private responseHandler: (response: any) => void;
}
