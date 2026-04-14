import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import serverRoute from '../routes/index';
import ApiResponse from '../utils/apiResponse';
import errorHandler from '../middlewares/errorHandler';

export default class App {
  private server: Application;

  constructor() {
    this.server = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.server.set('trust proxy', 1);

    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(morgan('combined'));

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    this.server.use(limiter);
  }

  private configureRoutes(): void {
    this.server.get('/health', (req, res) => {
      res.json(new ApiResponse(true, 'Server is healthy', { timestamp: new Date() }));
    });

    this.server.use('/api/v1', serverRoute);
  }

  private configureErrorHandling(): void {
    this.server.use((req, res) => {
      res.status(404).json(
        new ApiResponse(false, 'Resource not found', null, [
          { path: req.path, message: `Route ${req.method} ${req.path} not found` },
        ])
      );
    });

    this.server.use(errorHandler);
  }

  public getServer(): Application {
    return this.server;
  }
}
