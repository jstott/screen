import { Request, Response, NextFunction } from 'express';

import { BaseRouter } from './baseRouter';
import { Auth } from '../auth/auth';
import * as reviewQueries from '../queries/reviewQueries';

export class ReviewRouter extends BaseRouter {
  constructor() {
    super();
    this.buildRoutes();
  }

  public async post(req: Request, res: Response, next: NextFunction) {
    try {
      const review = await reviewQueries.create({
        tmdbId: req.body.tmdbId,
        userId: req.user.id,
        body: req.body.body,
      });

      res.json(review);
    } catch (err) {
      next(err);
    }
  }

  private buildRoutes() {
    this.router.post('/', Auth.isAuthenticated(), this.post);
  }
}
