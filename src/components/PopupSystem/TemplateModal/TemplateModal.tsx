import { FC, MouseEvent, ReactNode } from 'react';
import './TemplateModal.scss';

interface iTemplateModalProps {
  size?: 'sm' | 'md';
  children?: ReactNode;
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
  formId?: string;
  onCancel?: () => void;
  isLoading?: boolean;
  type?: 'video' | 'content' | 'message';
  background?: ReactNode;
  color?: 'yellow' | 'green' | 'red' | 'primary';
  className?: string;
}

export const TemplateModal: FC<iTemplateModalProps> = ({
  title,
  subTitle,
  children,
  size,
  formId,
  onCancel,
  isLoading,
  type = 'content',
  background,
  icon,
  color,
  className
}) => {
  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel?.();
  };

  return (
    <div className={`TemplateModal ${size} ${type} ${color} ${className}`}>
      {(title || icon || subTitle) && (
        <div
          className={`TemplateModal-header ${!icon ? 'without-icon' : ''} ${
            type === 'message' ? 'onlyIcon' : ''
          }`}>
          {icon}
          <h3 className='TemplateModal-title'>{title}</h3>
          <p className='TemplateModal-text'>{subTitle}</p>
        </div>
      )}
      {children && (
        <div className={`TemplateModal-main ${type === 'message' ? 'onlyIcon' : ''}`}>
          {children}
        </div>
      )}
      <div className='TemplateModal-bg'>{background}</div>
    </div>
  );
};
