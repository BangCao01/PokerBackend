import { Router } from 'express';
import ProjectService from './project.service';

const projectRouter = Router();
const projectService = new ProjectService();

projectRouter.get('/list', getProjects);
projectRouter.get('/listWith', getProjectWith);
projectRouter.post('/search', getProjectsBySearch);

projectRouter.get('/detail', getProjectDetail);
projectRouter.post('/create', createProject);
projectRouter.post('/update', updateProject);
projectRouter.post('/delete', deleteProject);
projectRouter.get('/', async (req, res, next) => {
  // Using async/await
  const projects = await projectService.getAll();
  res.send(projects);
});

/*
  create project controller
*/
async function createProject(req, res, next) {
  const url: string = req.body.url;
  const description: any = req.body.description;
  const title: any = req.body.title;

  if (url && description && title) {

    const project = await projectService.createWith(
      url,
      description,
      title
    );

    if (project) {
      res.send(project);
    }
  }
}

/*
  Update project controller
*/
async function updateProject(req, res, next) {
  const projectId: string = req.body.projectId;
  const title: any = req.body.title;
  const description: any = req.body.description;
  const url: any = req.body.url;


  const project = await projectService.update(
    projectId,
    url,
    description,
    title
  );
  res.send(project);
}

/*
  Get project list
*/
async function getProjects(req, res, next) {
  const projects = await projectService.getProjectList();
  res.send(projects);
}

/*
  Get project list
*/
async function getProjectWith(req, res, next) {
  const skip: number = Number(req.query.skip);
  const limit: number = Number(req.query.limit);
  const projects = await projectService.getProjectWith(skip, limit);
  res.send(projects);
}

/*
  Get project list by search
*/
async function getProjectsBySearch(req, res, next) {
  // const projectNo: string = req.body.projectNo;
  // const departmentName: any = req.body.departmentName;
  // const phaseNo: any = req.body.phaseNo;
  // const requestTitle: string = req.body.requestTitle;
  // console.log('phaseNo ' + phaseNo);

  // const department = await departmentService.getByDepartmentBy(departmentName);
  // console.log(department);
  // if (department) {
  //   const projects = await projectService.getProjectBySearch(
  //     projectNo,
  //     department[0]._id,
  //     phaseNo,
  //     requestTitle,
  //   );
  //   res.send(projects);
  // } else {
  //   return 'department not found';
  // }
}

/*
  Delete project
*/
async function deleteProject(req, res, next) {
  const projectNo: string = req.body.projectNo;
  const project = await projectService.delete({
    project_no: projectNo,
  });
  if (project) {
    const projects = await projectService.getAll();
    res.send(projects);
  }
}

/*
  Get project detail
*/
async function getProjectDetail(req, res, next) {
  const projectId: string = req.query.projectId;
  const project = await projectService.getByProjectId(projectId);
  if (project) {
    res.send(project);
  }
}

export default projectRouter;
