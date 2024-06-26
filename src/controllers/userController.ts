import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserDto, UpdatePasswordDto } from '../models/user';
import { users } from '../services/dataStore';

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }
  res.status(200).json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { login, password }: CreateUserDto = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser: User = {
    id: uuidv4(),
    login,
    password,
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUserPassword = (req: Request, res: Response) => {
  const { id } = req.params;
  const { oldPassword, newPassword }: UpdatePasswordDto = req.body;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }

  if (user.password !== oldPassword) {
    return res.status(403).json({ message: 'Old password is incorrect' });
  }

  user.password = newPassword;
  user.version += 1;
  user.updatedAt = Date.now();

  res.status(200).json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }

  users.splice(index, 1);
  res.status(204).end();
};
