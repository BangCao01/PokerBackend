import bcrypt from 'bcryptjs';
import oracledb from 'oracledb';
import RestService from '../../common/rest.service';
import UserRoleModel, { UserRoleName } from '../user.role/user.role.model';
import UserModel from './user.model';
const dbConfig = require('../../configs/oracledb');

class UserService implements RestfulService {
  private restService: RestService;
  constructor() {
    this.restService = new RestService(UserModel);
  }
  public async post(data: any) {
    return this.restService.post(data);
  }
  public async put(id: string, data: any) {
    return this.restService.put(id, data);
  }
  public async get(id: string) {
    return this.restService.get(id);
  }
  public async getAll() {
    return this.restService.getAll();
  }
  public async delete(data: any) {
    return this.restService.delete(data);
  }

  public async create(name: string, pass: string) {
    const user = new UserModel({
      username: name,
      password: pass,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      hash: '',
      salt: '',

    });

    // if (pass) {
    //   user.hash = bcrypt.hashSync(pass, 10);
    // }

    return user.save();
  }

  public async createUserLogin(
    name: string,
    pass: string,
  ) {
    const user = new UserModel({
      user: name,
      password: pass,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      hash: '',
      salt: '',
    });

    if (pass) {
      user.hash = bcrypt.hashSync(pass, 10);
    }

    return user.save();
  }

  public async getByName(username: string) {
    const user = await this.restService.findOne({ employee_number: username });
    return user;
  }
  public async authenticate(username: string, password: string) {
    const user = await this.restService.findOne({ employee_number: username });
    console.log(user);
    if (user && bcrypt.compareSync(password, user.hash)) {
      /*
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      //   return {
      //     ...userWithoutHash,
      //     token,
      //   };
      */
      return true;
    }

    return false;
  }

  public async update(
    name: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,

  ) {
    const user = await this.restService.findOne({ username: name });
    if (user) {
      user.first_name = firstName;
      user.last_name = lastName;
      user.email = email;
      user.phone = phone;
      return user.save();
    }
  }

}

export default UserService;
