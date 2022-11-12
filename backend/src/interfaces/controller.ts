import { Router } from "express";

export interface IController {
  getController: () => Router;
}
