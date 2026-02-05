import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase";

export class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Usuario y contraseña requeridos" });
      }

      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (error || !user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "12h" },
      );

      const { password_hash, ...userWithoutPassword } = user;

      res.json({
        message: "Login exitoso",
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = {
        username,
        password_hash: hash,
        role,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return res
            .status(400)
            .json({ error: "El nombre de usuario ya existe" });
        }
        return res.status(400).json({ error: error.message });
      }

      const { password_hash, ...createdUser } = data;

      res.status(201).json({
        message: "Usuario creado correctamente",
        user: createdUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  };
}

export const authController = new AuthController();
