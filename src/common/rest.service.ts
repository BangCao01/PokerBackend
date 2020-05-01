import mongoose from 'mongoose';

class RestService implements RestfulService {
  model: mongoose.Model<any>;
  constructor(model: mongoose.Model<any>) {
    this.model = model;
  }
  async post(data: any) {
    return 'post method';
  }
  async put(id: string, data: any) {
    return 'put method';
  }
  async get(id: string) {
    return this.model.findById(id);
  }
  async getAll() {
    return this.model.find();
  }

  async delete(data: any) {
    return this.model.deleteOne(data);
  }

  async findOne(data: any) {
    return this.model.findOne(data);
  }
}

export default RestService;
