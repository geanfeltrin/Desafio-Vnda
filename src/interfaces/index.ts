export interface User {
  id: number;
  name: string;
  email: string;
  external_code: string;
  role_name?: string;
  tags?: string[];
}

export type Tag = {
  id: string;
  name: string;
};
