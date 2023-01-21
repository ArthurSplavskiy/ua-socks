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

export interface IProxy {
	id: number;
	name: string;
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
	value: string;
	label: string;
}

export interface ISlide {
	title: string;
	text: string[];
	img: string;
}

export interface ISocial {
	name: string;
	icon: string;
	link: string;
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
