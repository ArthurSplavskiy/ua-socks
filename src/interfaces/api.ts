import { IProxy } from './shared';

export interface IMenu {
	id: number;
	name: string;
	slug: string;
}

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
}
