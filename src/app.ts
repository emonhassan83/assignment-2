import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UsersRoute } from './app/modules/user/user.route';
import { ProductRoute } from './app/modules/product/product.route';
const app: Application = express();

// parser
app.use(express.json())
app.use(cors())


// application route
app.use('/api/users', UsersRoute);
app.use('/api/users', ProductRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;