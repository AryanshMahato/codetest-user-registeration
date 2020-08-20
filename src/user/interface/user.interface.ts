export interface User {
  name: string;
  email: string;
  password: string;
  salt: string;
  cartId: string;
}

export interface InputUser {
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface Token {
  token_type: string;
  access_token: string;
  expires_in: number;
}
