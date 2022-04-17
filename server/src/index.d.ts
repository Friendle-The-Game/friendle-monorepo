import express from 'express';

export type ControllerType = Record<string, (req: express.Request, res: express.Response) => any>;
export type ServiceType = Record<string, (...params: any) => Promise<{ data?: any, error?: any }>>;