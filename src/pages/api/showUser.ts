import api from '../../services/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../interfaces/index';

export const showUser = async (id: string | string[]): Promise<User[]> => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | void> => {
  try {
    const id = req.query?.id;
    const user = await showUser(id);

    res.statusCode = 200;
    res.json(user);
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: 'Houve um erro ao buscar os dados' });
  }
};
