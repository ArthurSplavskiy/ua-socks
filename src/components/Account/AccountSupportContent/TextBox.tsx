import { FC, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  text: string | ReactNode;
  color: string;
}

export const TextBox: FC<Props> = ({ text, icon, color }) => {
  return (
    <div className={`TextBox ${color}`}>
      <div className='TextBox-content'>
        <div className='TextBox-icon'>{icon}</div>
        <p>{text}</p>
      </div>
    </div>
  );
};
