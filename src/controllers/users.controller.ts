import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { BaseController } from "./base.controller";
import supabase from "../config/supabase";

class UsersController extends BaseController {
  constructor() {
    super("users", "id, username, role, created_at, updated_at");
  }

  override create = async (req: Request, res: Response) => {
    try {
      const { username, password, role, ...rest } = req.body;

      if (!password) {
        return res.status(400).json({ error: "La contraseña es obligatoria" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = {
        ...rest,
        username,
        role,
        password_hash: hash,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const { data, error } = await supabase
        .from(this.tableName)
        .insert([newUser])
        .select("id, username, role, created_at, updated_at")
        .maybeSingle();

      if (error) {
        if (error.code === "23505")
          return res
            .status(400)
            .json({ error: "El nombre de usuario ya existe" });
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  override update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password, ...rest } = req.body;

      let updateData: any = {
        ...rest,
        updated_at: new Date(),
      };

      delete updateData.id;
      delete updateData.created_at;
      delete updateData.created_by;
      delete updateData.username;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password_hash = await bcrypt.hash(password, salt);
      }

      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq("id", id)
        .select("id, username, role, created_at, updated_at")
        .single();

      if (error) return res.status(400).json({ error: error.message });

      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}

export const usersController = new UsersController();
