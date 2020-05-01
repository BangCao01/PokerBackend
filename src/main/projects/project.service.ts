import bcrypt from 'bcryptjs';
//import jwt from '../../helper/jwt';
import RestService from '../../common/rest.service';
import ProjectModel from './project.model';

class ProjectService implements RestfulService {
  private restService: RestService;
  constructor() {
    this.restService = new RestService(ProjectModel);
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

  public async create() {
    const project = new ProjectModel({
      url: '',
      description: '',
      title: '',

    });

    return project.save();
  }

  public async createWith(
    _url: string,
    _description: string,
    _title: string,

  ) {
    const project = new ProjectModel({
      url: _url,
      description: _description,
      title: _title,
    });

    const pr = project.save();
    if (pr) {
      return project;
    } else {
      return 'not successful !';
    }
  }

  /*
    Get project by id
  */
  public async getByProjectId(projectId: string) {
    const project = await this.restService.model
      .findOne({
        _id: projectId,
      })
      .exec();
    return project;
  }


  /*
    Fetch project info with
  */
  public async getProjectList() {
    return this.restService.model
      .find();
  }

  /*
      Fetch project info with skip, limit
    */
  public async getProjectWith(aSkip: number, aLimit: number) {
    return this.restService.model
      .find().skip(aSkip).limit(aLimit);
  }

  public async update(
    projectId: string,
    _url: string,
    _title: string,
    _description: string

  ) {
    const project = await this.restService.findOne({ _id: projectId });
    if (project) {
      project.url = _url;
      project.title = _title;
      project.description = _description;

      project.save();
      return project;
    }
  }
}

export default ProjectService;
