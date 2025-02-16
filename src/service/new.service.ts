import { Request, Response, Router } from 'express';
import { announcements, events, news } from '../mocks';
import { StatusCode } from '../types';
import { response } from '../utils';

class NewsService {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/news', async (req: Request, res: Response): Promise<any> => {
      try {
        return response(res, news, StatusCode.OK);
      } catch (error) {
        return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
      }
    });
    this.router.get('/news/:id', async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const newSelected = news.find((item) => item.id === id);
            return response(res, newSelected, StatusCode.OK);
        } catch (error) {
            return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
        }
    })
    this.router.get('/news/others/events', async (req: Request, res: Response): Promise<any> => {
        try {
            return response(res, events, StatusCode.OK);
        } catch (error) {
            return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
        }
    })
    this.router.get('/news/others/announcements', async (req: Request, res: Response): Promise<any> => {
        try {
            return response(res, announcements, StatusCode.OK);
        } catch (error) {
            return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
        }
    })
  }
}

export default new NewsService().router;
