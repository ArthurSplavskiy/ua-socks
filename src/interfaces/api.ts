import {
  IAdvantages,
  IProxy,
  IProxyPrices,
  ISlide,
  ISocial,
  ITab,
  ISectionHead,
  IFaq,
  IMenu,
  IProxyCartStats,
  ISelectOption,
  IOgContent
} from './shared';

export interface IHomePageData {
  access_period: ISelectOption[];
  export_formats: ISelectOption[];
  export_setting: IExportSettings[];
  footer_links: IFooterLinks;
  home_advantages: IHomeAdvantages;
  home_faq: IHomeFaqs;
  home_hero: IHomeHero;
  home_question: IHomeQuestion;
  home_social: IHomeSocial;
  home_speed: IHomeSpeed;
  home_tarifs: IHomeTarifs;
  home_usage: IHomeUsage;
  interface: IPageTextInterface;
  menu: IMenu[];
  payment_methods: ISelectOption[];
  profile: IUserProfile;
  proxy_tarifs: IProxyTarifList[];
  users: IUser[];
  support_link: string;
  og_content: IOgContent;
}

export interface IPolicyPageData {
  page_title: string;
  text: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface IUserProfile {
  id: string;
  name: string | null;
  email: string;
  nickname_telegram: string;

  // not et
  password: string;
  balance: number;
  proxy: IProxy[];

  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface IPageTextInterface {
  account_btn: string;
  buyProxy_btn: string;
  question_btn: string;
  register_btn: string;
  register_text1: string;
  register_text2: string;
  form_email: string;
  form_password: string;
  form_repeat_password: string;
  registration_title: string;
  login_title: string;
  forgot_password: string;
  no_have_acc: string;
  registration_link: string;
  error_title: string;
  login_btn: string;
  thank_text: string;
  thank_message: string;
  ping: string;
  download: string;
  upload: string;
  buy_btn: string;
  rent_term_text: string;
  operators_text: string;
  geo_text: string;
  profile_acc_text: string;
  account_link_1: string;
  account_link_2: string;
  account_link_3: string;
  account_link_4: string;
  cookies_agreement_text: string;
  yes: string;
  no: string;
  acc_title1: string;
  acc_group_btn: string;
  acc_balance: string;
  acc_add: string;
  acc_proxy: string;
  acc_validity: string;
  acc_auto_continue: string;
  acc_ip_change_link: string;
  acc_continue: string;
  acc_exchange: string;
  acc_export: string;
  acc_proxy_info: string;
  acc_not_have_proxy: string;
  acc_days_info: string;
  copied: string;
  close: string;
  acc_max_add_sum: string;
  acc_add_sum: string;
  acc_payment_type: string;
  acc_payment_input_text: string;
  acc_payment_btn_text: string;
  back_home: string;
  acc_auto_replace_ip: string;
  apply: string;
  cancel: string;
  minute: string;
  acc_export_proxy: string;
  acc_format: string;
  acc_export_setting: string;
  acc_export_setting_label: string;
  acc_export_btn: string;
  acc_continue_proxy: string;
  acc_access_period: string;
  form_error_balance: string;
  acc_continue_btn: string;
  acc_paid: string;
  forgot_pass_info: string;
  spam_check: string;
  send: string;
  support_info: string;
  support_feedback: string;
  personal_data: string;
  personal_mail: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
  save: string;
}

export interface IHomeHero extends ISectionHead {
  title_gradient: string;
  img: string;
}

export interface IHomeAdvantages extends ISectionHead {
  advantages: IAdvantages[];
}

export interface IHomeSpeed extends ISectionHead {
  tabs: ITab[];
}

export interface IHomeTarifs extends ISectionHead {}

export interface IProxyTarif {
  id: number;
  status: string;
  mark: boolean;
  color?: 'primary' | 'green' | 'red' | null;
  operators: string[];
  rent_terms: string[];
  prices: IProxyPrices[];
  stats: IProxyCartStats[];
}

export interface IProxyTarifList {
  geo: string;
  regionId: number;
  isExistTariffs: boolean;
  proxy: IProxyTarif[];
}

export interface IHomeUsage extends ISectionHead {
  slider: ISlide[];
}

export interface IHomeSocial extends ISectionHead {
  social: ISocial[];
}

export interface IHomeFaqs {
  title: string;
  faqs: IFaq[];
}

export interface IHomeQuestion extends ISectionHead {
  img: string;
}

export interface IFooterLinks {
  footer_telegram: string;
  footer_privacy_links: IMenu[];
  footer_menu: IMenu[];
}

export interface IExportSettings {
  id: string | number;
  name: string;
}
