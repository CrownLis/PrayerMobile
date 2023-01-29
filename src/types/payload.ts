export type SignUpPayload = {
  email: string;
  name: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type GetDesksPayload = {
  limit: number;
  afterCursor: string;
};
