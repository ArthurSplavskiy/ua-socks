import { FC } from 'react';

interface Props {
	text: string | undefined;
}

export const Popover: FC<Props> = ({ text }) => {
	return <div className='ProxyTable-popover'>{text}</div>;
};
