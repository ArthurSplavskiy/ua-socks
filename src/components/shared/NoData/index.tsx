import styles from './NoData.module.scss';

export const NoData = ({ message }: { message: string }) => {
  return <div className={styles.text}>{message}</div>;
};
