export type GenericResponse = {
  status: number;
  message: string | undefined;
};

export type CollectionMeta = {
  total: number;
  skip: number;
  limit: number;
};

export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  balance: number;
};

export type UserTokens = {
  token: string;
};
