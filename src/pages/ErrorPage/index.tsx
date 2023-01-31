import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	// @ts-ignore
	const error: { statusText: string; message: string; status: number } = useRouteError();

	if (error.status === 404) {
		//console.log('djkwej');
	}

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
