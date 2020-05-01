interface RestfulService {
  post(data: any): any;
  put(id: string, data: any): any;
  get(id: string, data: any): any;
  getAll(): any;
  delete(data: any): any;
}
