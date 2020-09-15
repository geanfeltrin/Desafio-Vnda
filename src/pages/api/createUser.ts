import api from '../../services/api';

interface createUserProps {
  name: string;
  email: string;
  external_code: string;
  role_name: string;
  tags: string[];
}

export const createUser = async ({
  name,
  email,
  role_name,
  external_code,
  tags,
}: createUserProps): Promise<void> => {
  try {
    const response = await api.post('/users', {
      name,
      email,
      role_name,
      external_code,
      tags,
    });
    return response.data;
  } catch (error) {
    throw new Error('Não foi possivel criar o usuário');
  }
};
