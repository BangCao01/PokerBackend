import { Router } from 'express';
import ProjectService from '../projects/project.service';
import UserService from './user.service';

const userRouter = Router();
const userService = new UserService();
const projectService = new ProjectService();

userRouter.post('/authenticate', authenticate);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/delete', deleteUser);
userRouter.get('/getBy', getByUserName);
userRouter.get('/', async (req, res, next) => {
  // Using async/await
  const users = await userService.getAll();
  res.send(users);
});


function authenticate(req, res, next) {
  const username: string = req.query.username;
  const password: string = req.query.password;
  userService.authenticate(username, password);
  // .then((user) =>
  //   user
  //     ? res.json(user)
  //     : res
  //         .status(400)
  //         .json({ message: 'Username or password is incorrect' }),
  // )
  // .catch((err) => next(err));
}

/*
  register controller
*/
async function register(req, res, next) {
  const username: string = req.body.username;
  const password: string = req.body.password;


  const user = await userService.create(username, password);
  if (user)
    res.send(user);

}

/*
  login controller
*/
async function login(req, res, next) {
  try {

    const username: string = req.body.username;
    const password: string = req.body.password;
    console.log(password);
    const isAuthenticated = await userService.authenticate(username, password);
    if (isAuthenticated) {
      const users = await userService.getByName(username);
      res.send(users);
    } else {
      res.send('User not found');
    }
  } catch (err) {
    console.error(err);
  }
}

/*
  delete user
*/
async function deleteUser(req, res, next) {
  const userId: string = req.body.userId;
  const user = await userService.delete({
    _id: userId,
  });
  if (user) {
    const users = await userService.getAll();
    res.send(users);
  }
}


/*
  Get by user name
*/
async function getByUserName(req, res, next) {
  const username: string = req.query.username;
  const user = await userService.getByName(username);
  res.send(user);
}

export default userRouter;
