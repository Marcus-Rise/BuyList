interface IError {
  code: number;
  text: string;
}

interface IFileInfo {
  id: string;
  name: string;
}

interface IGoogleDriveService {
  createFile(name: string, mimeType: string, data: string): Promise<IFileInfo | IError>;

  getFile(id: string): Promise<IFileInfo | IError>;

  getFileList(): Promise<IFileInfo[] | IError>;

  isError(obj: IFileInfo | IFileInfo[] | IError): obj is IError;
}

export type { IGoogleDriveService, IError, IFileInfo };
