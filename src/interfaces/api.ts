import {
	IAdvantages,
	IProxy,
	IProxyPrices,
	ISlide,
	ISocial,
	ITab,
	ISectionHead,
	IFaq,
	IMenu
} from './shared';

export interface IUserProfile {
	userId: number;
	email: string;
	telegram: string;
	password: string;
	balance: number;
	proxy: IProxy[];
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
	color: 'primary' | 'green' | 'red';
	operators: string[];
	rent_terms: string[];
	prices: IProxyPrices[];
	stats: string[];
}

export interface IProxyTarifList {
	geo: string;
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
