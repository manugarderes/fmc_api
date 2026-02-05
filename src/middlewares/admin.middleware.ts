import { NextFunction, Request, Response } from "express";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      error: "Acceso denegado: Se requieren permisos de administrador.",
    });
  }
  next();
};
