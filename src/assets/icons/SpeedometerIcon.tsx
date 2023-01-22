import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {}

export const SpeedometerIcon: FC<Props> = ({ ...props }) => {
	return (
		<svg
			className={props.className}
			width='183'
			height='154'
			viewBox='0 0 183 154'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M151.017 151.017C153.879 153.879 158.547 153.897 161.171 150.814C171.262 138.962 178.189 124.697 181.242 109.351C184.772 91.6015 182.96 73.2039 176.035 56.4844C169.11 39.765 157.382 25.4747 142.335 15.4205C127.288 5.36638 109.597 -1.07902e-07 91.5 0C73.403 1.07902e-07 55.7124 5.36638 40.6653 15.4205C25.6183 25.4747 13.8905 39.765 6.96506 56.4844C0.0396453 73.2039 -1.77236 91.6015 1.75819 109.351C4.81068 124.697 11.7383 138.962 21.8289 150.814C24.4535 153.897 29.1206 153.879 31.9835 151.017C34.8463 148.154 34.8154 143.532 32.2383 140.41C24.1734 130.638 18.6247 118.991 16.1382 106.49C13.1734 91.5852 14.695 76.1356 20.5107 62.0952C26.3264 48.0549 36.175 36.0544 48.811 27.6113C61.4469 19.1682 76.3028 14.6617 91.5 14.6617C106.697 14.6617 121.553 19.1682 134.189 27.6113C146.825 36.0544 156.674 48.0549 162.489 62.0952C168.305 76.1356 169.827 91.5852 166.862 106.49C164.375 118.991 158.827 130.638 150.762 140.41C148.185 143.532 148.154 148.154 151.017 151.017Z'
				fill='url(#paint0_linear_860_12704)'
			/>
			<path
				d='M45.911 136.654C45.1011 136.654 44.4566 136.352 43.9775 135.748C43.4984 135.143 43.2588 134.333 43.2588 133.318C43.2588 132.303 43.4984 131.493 43.9775 130.888C44.4566 130.284 45.1011 129.981 45.911 129.981C46.7209 129.981 47.3654 130.284 47.8445 130.888C48.3236 131.493 48.5631 132.303 48.5631 133.318C48.5631 134.333 48.3236 135.143 47.8445 135.748C47.3654 136.352 46.7209 136.654 45.911 136.654ZM45.911 135.628C46.3444 135.628 46.6866 135.422 46.9376 135.012C47.1886 134.601 47.314 134.036 47.314 133.318C47.314 132.599 47.1886 132.035 46.9376 131.624C46.6866 131.213 46.3444 131.008 45.911 131.008C45.4775 131.008 45.1353 131.213 44.8843 131.624C44.6334 132.035 44.5079 132.599 44.5079 133.318C44.5079 134.036 44.6334 134.601 44.8843 135.012C45.1353 135.422 45.4775 135.628 45.911 135.628Z'
				fill='#1B1B1D'
			/>
			<path
				d='M123.948 132.189V131.179H124.239C124.798 131.179 125.174 131.105 125.368 130.957C125.574 130.797 125.699 130.5 125.745 130.067H126.669V136.569H125.437V132.189H123.948ZM130.878 136.654C130.068 136.654 129.424 136.352 128.944 135.748C128.465 135.143 128.226 134.333 128.226 133.318C128.226 132.303 128.465 131.493 128.944 130.888C129.424 130.284 130.068 129.981 130.878 129.981C131.688 129.981 132.332 130.284 132.811 130.888C133.291 131.493 133.53 132.303 133.53 133.318C133.53 134.333 133.291 135.143 132.811 135.748C132.332 136.352 131.688 136.654 130.878 136.654ZM130.878 135.628C131.311 135.628 131.654 135.422 131.905 135.012C132.156 134.601 132.281 134.036 132.281 133.318C132.281 132.599 132.156 132.035 131.905 131.624C131.654 131.213 131.311 131.008 130.878 131.008C130.444 131.008 130.102 131.213 129.851 131.624C129.6 132.035 129.475 132.599 129.475 133.318C129.475 134.036 129.6 134.601 129.851 135.012C130.102 135.422 130.444 135.628 130.878 135.628ZM137.038 136.654C136.228 136.654 135.583 136.352 135.104 135.748C134.625 135.143 134.386 134.333 134.386 133.318C134.386 132.303 134.625 131.493 135.104 130.888C135.583 130.284 136.228 129.981 137.038 129.981C137.848 129.981 138.492 130.284 138.971 130.888C139.45 131.493 139.69 132.303 139.69 133.318C139.69 134.333 139.45 135.143 138.971 135.748C138.492 136.352 137.848 136.654 137.038 136.654ZM137.038 135.628C137.471 135.628 137.813 135.422 138.064 135.012C138.315 134.601 138.441 134.036 138.441 133.318C138.441 132.599 138.315 132.035 138.064 131.624C137.813 131.213 137.471 131.008 137.038 131.008C136.604 131.008 136.262 131.213 136.011 131.624C135.76 132.035 135.635 132.599 135.635 133.318C135.635 134.036 135.76 134.601 136.011 135.012C136.262 135.422 136.604 135.628 137.038 135.628Z'
				fill='#1B1B1D'
			/>
			<path
				d='M90.7249 33.3007V34.3616H85.951V33.5574L88.2439 31.5554C88.6545 31.2018 88.9397 30.8881 89.0994 30.6143C89.2705 30.3406 89.356 30.0611 89.356 29.7759C89.356 29.4793 89.2591 29.2455 89.0652 29.0744C88.8827 28.8919 88.6374 28.8006 88.3294 28.8006C87.9644 28.8006 87.6735 28.9147 87.4568 29.1428C87.2514 29.371 87.1431 29.7075 87.1317 30.1524L85.9681 29.947C86.0252 29.274 86.2647 28.7436 86.6868 28.3557C87.1203 27.9679 87.6849 27.774 88.3807 27.774C89.0424 27.774 89.5785 27.9508 89.9891 28.3044C90.3998 28.658 90.6051 29.1143 90.6051 29.6733C90.6051 30.141 90.4625 30.5744 90.1774 30.9737C89.9036 31.3615 89.4131 31.852 88.7058 32.4452L87.6963 33.3007H90.7249ZM94.147 34.4471C93.3371 34.4471 92.6926 34.1448 92.2135 33.5403C91.7344 32.9357 91.4949 32.1258 91.4949 31.1106C91.4949 30.0953 91.7344 29.2854 92.2135 28.6808C92.6926 28.0763 93.3371 27.774 94.147 27.774C94.9569 27.774 95.6014 28.0763 96.0805 28.6808C96.5596 29.2854 96.7992 30.0953 96.7992 31.1106C96.7992 32.1258 96.5596 32.9357 96.0805 33.5403C95.6014 34.1448 94.9569 34.4471 94.147 34.4471ZM94.147 33.4205C94.5805 33.4205 94.9227 33.2152 95.1737 32.8045C95.4246 32.3939 95.5501 31.8292 95.5501 31.1106C95.5501 30.3919 95.4246 29.8273 95.1737 29.4166C94.9227 29.0059 94.5805 28.8006 94.147 28.8006C93.7136 28.8006 93.3713 29.0059 93.1204 29.4166C92.8694 29.8273 92.744 30.3919 92.744 31.1106C92.744 31.8292 92.8694 32.3939 93.1204 32.8045C93.3713 33.2152 93.7136 33.4205 94.147 33.4205Z'
				fill='#1B1B1D'
			/>
			<path
				d='M27.58 90.3323V89.3228H27.8709C28.4298 89.3228 28.8062 89.2487 29.0002 89.1004C29.2055 88.9407 29.331 88.6441 29.3766 88.2106H30.3006V94.7126H29.0686V90.3323H27.58Z'
				fill='#1B1B1D'
			/>
			<path
				d='M146.931 90.5205C147.581 90.5205 148.106 90.7088 148.505 91.0852C148.916 91.4616 149.121 91.9692 149.121 92.608C149.121 93.2468 148.893 93.7716 148.437 94.1822C147.98 94.5929 147.416 94.7982 146.743 94.7982C145.887 94.7982 145.231 94.4959 144.775 93.8913C144.33 93.2754 144.108 92.4883 144.108 91.5301C144.108 90.5262 144.341 89.7106 144.809 89.0833C145.288 88.4445 145.973 88.1251 146.862 88.1251C147.284 88.1251 147.672 88.2049 148.026 88.3646C148.391 88.5129 148.693 88.7353 148.933 89.0319L148.094 89.7848C147.969 89.5795 147.798 89.4255 147.581 89.3228C147.364 89.2087 147.125 89.1517 146.862 89.1517C146.315 89.1517 145.904 89.357 145.63 89.7677C145.357 90.1783 145.214 90.6974 145.203 91.3247C145.59 90.7886 146.167 90.5205 146.931 90.5205ZM146.708 93.8058C147.062 93.8058 147.353 93.6974 147.581 93.4807C147.821 93.2639 147.94 92.9788 147.94 92.6252C147.94 92.2715 147.826 91.9921 147.598 91.7867C147.381 91.57 147.096 91.4616 146.743 91.4616C146.378 91.4616 146.075 91.57 145.836 91.7867C145.596 91.9921 145.476 92.2715 145.476 92.6252C145.476 92.9788 145.59 93.2639 145.819 93.4807C146.047 93.6974 146.343 93.8058 146.708 93.8058ZM152.492 94.7982C151.682 94.7982 151.037 94.4959 150.558 93.8913C150.079 93.2868 149.84 92.4769 149.84 91.4616C149.84 90.4464 150.079 89.6365 150.558 89.0319C151.037 88.4273 151.682 88.1251 152.492 88.1251C153.302 88.1251 153.946 88.4273 154.425 89.0319C154.904 89.6365 155.144 90.4464 155.144 91.4616C155.144 92.4769 154.904 93.2868 154.425 93.8913C153.946 94.4959 153.302 94.7982 152.492 94.7982ZM152.492 93.7716C152.925 93.7716 153.267 93.5662 153.518 93.1556C153.769 92.7449 153.895 92.1803 153.895 91.4616C153.895 90.743 153.769 90.1783 153.518 89.7677C153.267 89.357 152.925 89.1517 152.492 89.1517C152.058 89.1517 151.716 89.357 151.465 89.7677C151.214 90.1783 151.089 90.743 151.089 91.4616C151.089 92.1803 151.214 92.7449 151.465 93.1556C151.716 93.5662 152.058 93.7716 152.492 93.7716Z'
				fill='#1B1B1D'
			/>
			<path
				d='M40.7206 49.9363V48.9268H41.0115C41.5704 48.9268 41.9469 48.8527 42.1408 48.7044C42.3461 48.5447 42.4716 48.2481 42.5172 47.8146H43.4412V54.3167H42.2092V49.9363H40.7206ZM47.6504 54.4022C46.8405 54.4022 46.196 54.0999 45.7169 53.4953C45.2378 52.8908 44.9983 52.0809 44.9983 51.0656C44.9983 50.0504 45.2378 49.2405 45.7169 48.6359C46.196 48.0314 46.8405 47.7291 47.6504 47.7291C48.4603 47.7291 49.1048 48.0314 49.5839 48.6359C50.063 49.2405 50.3026 50.0504 50.3026 51.0656C50.3026 52.0809 50.063 52.8908 49.5839 53.4953C49.1048 54.0999 48.4603 54.4022 47.6504 54.4022ZM47.6504 53.3756C48.0839 53.3756 48.4261 53.1702 48.677 52.7596C48.928 52.3489 49.0535 51.7843 49.0535 51.0656C49.0535 50.347 48.928 49.7823 48.677 49.3717C48.4261 48.961 48.0839 48.7557 47.6504 48.7557C47.2169 48.7557 46.8747 48.961 46.6238 49.3717C46.3728 49.7823 46.2473 50.347 46.2473 51.0656C46.2473 51.7843 46.3728 52.3489 46.6238 52.7596C46.8747 53.1702 47.2169 53.3756 47.6504 53.3756Z'
				fill='#1B1B1D'
			/>
			<path
				d='M136.535 51.7158V52.7767H135.543V54.3167H134.396V52.7767H131.197V51.7672L134.054 47.8146H135.543V51.7158H136.535ZM132.429 51.7158H134.396V49.0124L132.429 51.7158ZM139.786 54.4022C138.976 54.4022 138.332 54.0999 137.853 53.4953C137.374 52.8908 137.134 52.0809 137.134 51.0656C137.134 50.0504 137.374 49.2405 137.853 48.6359C138.332 48.0314 138.976 47.7291 139.786 47.7291C140.596 47.7291 141.241 48.0314 141.72 48.6359C142.199 49.2405 142.438 50.0504 142.438 51.0656C142.438 52.0809 142.199 52.8908 141.72 53.4953C141.241 54.0999 140.596 54.4022 139.786 54.4022ZM139.786 53.3756C140.22 53.3756 140.562 53.1702 140.813 52.7596C141.064 52.3489 141.189 51.7843 141.189 51.0656C141.189 50.347 141.064 49.7823 140.813 49.3717C140.562 48.961 140.22 48.7557 139.786 48.7557C139.353 48.7557 139.01 48.961 138.76 49.3717C138.509 49.7823 138.383 50.347 138.383 51.0656C138.383 51.7843 138.509 52.3489 138.76 52.7596C139.01 53.1702 139.353 53.3756 139.786 53.3756Z'
				fill='#1B1B1D'
			/>
		</svg>
	);
};