import { Router } from 'express';

import projectRouter from '../main/projects/projects.routes';
import userRouter from '../main/users/users.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);

export default router;
