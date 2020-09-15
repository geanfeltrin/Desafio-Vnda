import api from '../../services/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../interfaces/index';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return await response.data;
};

export default async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<User[] | void> => {
  try {
    const users = await getUsers();
    res.statusCode = 200;
    res.json(users);
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: 'Houve um erro ao buscar os dados' });
  }
};
