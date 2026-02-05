import { Request, Response } from "express";
import supabase from "../config/supabase";

export class BaseController {
  constructor(
    protected tableName: string,
    protected defaultSelect: string = "*",
  ) {}

  getAll = async (req: Request, res: Response) => {
    // Usamos this.defaultSelect en lugar de '*'
    const { data, error } = await supabase
      .from(this.tableName)
      .select(this.defaultSelect);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(this.tableName)
      .select(this.defaultSelect) // Usamos this.defaultSelect aquí también
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "No encontrado" });
    res.json(data);
  };

  create = async (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      created_by: req.user?.id,
      updated_by: req.user?.id,
    };
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([payload])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = {
      ...req.body,
      updated_by: req.user?.id,
      updated_at: new Date(),
    };
    // Protección: no dejar editar created_by ni id
    delete payload.created_by;
    delete payload.id;

    const { data, error } = await supabase
      .from(this.tableName)
      .update(payload)
      .eq("id", id)
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error } = await supabase.from(this.tableName).delete().eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Eliminado correctamente" });
  };
}
