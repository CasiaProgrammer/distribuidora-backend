import { Response } from 'express';

export abstract class BaseController {
  ok(res: Response, data?: any) { res.status(200).json(data ?? { ok: true }); }
  created(res: Response, data?: any) { res.status(201).json(data ?? { ok: true }); }
  noContent(res: Response) { res.status(204).end(); }
}