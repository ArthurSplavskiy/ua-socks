export const dataOrEmptyArray = (data: any[] | undefined | null) => (data ? data : []);

export function notValidForm<T>(data: T, scrollToFirstError = false) {
	const invalidFields = Object.entries(data).filter(([key, value]) => !value?.checkValidity());

	if (!!invalidFields?.length && scrollToFirstError) {
		const firstInvalidKey = invalidFields?.[0]?.[0];
		const firstInvalidInput = document.querySelector(`#${firstInvalidKey}`);
		firstInvalidInput?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'start'
		});
	}

	return invalidFields.length > 0;
}

export const getApiError = (error: any, formData?: any) => {
	const errors = error?.response?.data?.errors;
	const isErrors = errors && !!Object.keys(errors).length;

	isErrors &&
		Object.entries(errors).forEach(([key, value]) => {
			formData?.[key]?.setErrors(value as string[]);
		});

	return {
		//msg: error?.response?.data?.message,
		msg: error?.response?.data,
		errors: isErrors ? errors : null
	};
};
