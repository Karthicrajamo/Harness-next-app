export interface LoginFooterSectionProps {
  version?: string;
  companyName?: string;
}

export type LoginFormValues = {
  username: string;
  password: string;
};
export type resetPasswordFormValues = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

export type loginPayloadType = {
  companyId: number;
  companyName: string;
  divisionId: number | null;
  divisionName: string | null;
  userId: string;
  password: string;
};
export interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

export type resetPasswordPayloadType = {
  userId: string;
  oldPassword: string;
  newPassword: string;
  companyId: number;
  divisionId: number | null;
};

export interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

export type ApiResponse = {
  message: string;
};