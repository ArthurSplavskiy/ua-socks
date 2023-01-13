export interface IDataHooks<DataType> {
	data: DataType;
	isLoading: boolean;
	isError: string;
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
	validity: string;
	socks: string;
	http: string;
	url_ip_replace: string;
	auto_continue: boolean;
}

export interface IEventError {
	type: string;
	text: string;
}
