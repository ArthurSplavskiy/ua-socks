import { FC } from 'react';
import { Link } from 'react-router-dom';
import './FormFooter.scss';

interface Props {
  leftText: string | undefined;
  rightText: string | undefined;
  linkCallback: () => void;
  close?: () => void;
}

export const FormFooter: FC<Props> = ({ linkCallback, leftText, rightText, close }) => {
  return (
    <div className='FormFooter'>
      <div className='FormFooter-link'>
        <div>{leftText}</div>
        <button onClick={linkCallback}>{rightText}</button>
      </div>
      <div className='FormFooter-policy'>
        Натиснувши на кнопку, ви даєте згоду на обробку персональних даних, погоджуєтеся з
        <Link to='/privacy-policy' onClick={() => close?.()}>
          {' '}
          політикою конфіденційності
        </Link>{' '}
        та
        <Link to='/oferta' onClick={() => close?.()}>
          {' '}
          угодою публічної оферти
        </Link>
      </div>
    </div>
  );
};
