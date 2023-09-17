export const calcValidity = (expires_at: string) => {
  const currentDate = new Date();
  const targetDate = new Date(expires_at);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
};
