export type IDType = number | string;

export interface IDataHooks<DataType> {
  data: DataType;
  isLoading: boolean;
  isError: string;
}

export interface ISectionHead {
  title: string;
  subtitle: string;
}

export type TRegistrationPostData = {
  email: string;
  password: string;
  confirm_password: string;
};

export type TLoginPostData = {
  email: string;
  password: string;
};
export type TLogoutPostData = {
  name?: null;
  email: string;
  password: string;
};

export type TBalancePostData = {
  balance: string;
};

export interface IProxy {
  id: number;
  name: string;
  logo: string;
  country: string;
  validity: number;
  socks: string;
  http: string;
  url_ip_replace: string;
  auto_continue: boolean;
}

export interface IEventError {
  type: string;
  text: string;
}

export interface IAdvantages {
  id: number;
  title: string;
  text: string;
  img: string;
}

export interface ITab {
  id?: IDType;
  title?: string;
  name: string;
  descr_title: string;
  descr: string[];
  speed: number;
  stats: {
    ping: number;
    download: number;
    upload: number;
  };
}

export interface IProxyPrices {
  active: boolean;
  total: number;
  rent_term: string;
  operator: string;
}

export interface ISelectOption {
  id?: number;
  value: string;
  label: string;
}

export interface ISlide {
  title: string;
  text: string[] | string;
  img: string;
}

export interface ISocial {
  name: string;
  icon: string;
  link?: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IMenu {
  id: number;
  name: string;
  slug: string;
}

export interface IProxyCartStats {
  support: boolean;
  value: string;
}

export interface IOgContent {
  title: string;
  description: string;
  image: string;
}

export interface IUpdateAccountEmail {
  email: string;
  password: string;
  old_email: string;
}

export interface IUpdateAccountPwd {
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}
