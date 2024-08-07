import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes'; 
import dotenv from 'dotenv';
import swaggerSpec from "./swagger";
import swaggerUi from 'swagger-ui-express';


dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); 

app.use('/api', routes);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
