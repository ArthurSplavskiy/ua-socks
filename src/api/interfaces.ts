export interface APIResponse {
  status: boolean;
  message: string;
  errors: IRegisterError | unknown;
}

interface IRegisterError {
  email: string[];
  password: string[];
}
