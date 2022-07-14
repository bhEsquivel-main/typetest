

export class AppContext {
    ID: string;
    version: string;
    //

    
  initialize(): Promise<any> {
    return new Promise(res => {
      res(undefined);
    });
  }

}