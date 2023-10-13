import { iValidatorObj } from './inputsInterfaces';

export const prepareValidatorsArr = (
  validators: Array<iValidatorObj | keyof typeof inputValidators>
): iValidatorObj[] => {
  const validatorsArr: iValidatorObj[] = [];
  validators.forEach((item) => {
    const validator = typeof item === 'string' ? inputValidators[item] : item;
    validatorsArr.push(validator);
  });
  return validatorsArr;
};

/**
 * Function validates string
 * @param {string} val - string to validate
 * @param {iValidatorObj[]} validators - validation fns array
 * @return {string[]} - validation errors array
 */
export const applyValidators = (val: string, validators: iValidatorObj[]): string[] => {
  const errors: string[] = [];

  for (let i = 0; i < validators.length; i++) {
    if (!validators[i].checkFn(val)) {
      errors.push(validators[i].error);
      break;
    }
  }
  return errors;
};

export const phoneValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  // .replace(/[^\(\)\s\-\.\+\d]/g, "").replace(/\s\s+/g, " ")
  //const newPhone = value.replace(/^\+?[0-9]{6,14}$/gm, "");
  // value.replace(/^\[^7]+|^([0-9]{15}).*|[^0-9]+/g, "$1")
  const re = new RegExp(/^\[^7]+|^([0-9]{7,15})/g);
  return re.test(value);
};

export const nameValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const lettersRx = new RegExp(/[^\p{L}'`\s-]+/gmu);
  const twoSpacesRx = new RegExp(/\s\s+/gm);
  return !lettersRx.test(value) && !twoSpacesRx.test(value) && value.length >= 2;
};

export const emailValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const re = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return re.test(value);
};
//
export const passwordValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  if (value.length < 8) return false;
  return true;
  // const re = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/g);
  // return re.test(value);
};

export const urlValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const str = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
  );
  return str.test(value);
};

export const numberRangeValidation = <T>(value: T) => {
  if (value === '') return true;
  if (typeof value !== 'string') return false;
  if (Number(value) < 1 || Number(value) > 5000) return false;
  const str = new RegExp(/^[0-9]*$/gm);
  return str.test(value);
};

export const minuteRangeValidation = <T>(value: T) => {
  if (value === '') return true;
  if (typeof value !== 'string') return false;
  if (Number(value) < 1 || Number(value) > 60) return false;
  const str = new RegExp(/^[0-9]*$/gm);
  return str.test(value);
};

export const errorsMessages = {
  EMAIL: 'Введіть дійсну адресу електронної пошти', //'Please enter a valid email',
  PASSWORD: 'Пароль має містити не менше 8 символів',
  // 'Пароль має містити не менше 8 символів, одну велику літеру та принаймні одну цифру або спеціальний символ',
  //'Password must contain at least 8 characters, one uppercase letter and at least one number or special character',
  PASSWORD_NOT_MATCH: 'Пароль не збігається', // 'Password does not match',
  NAME: 'Please enter a valid name',
  PHONE: 'Please enter a valid phone number',
  WEBSITE: 'Please enter a valid website address',
  URL: 'Please enter a valid url',
  NUMBER_RANGE: 'Будь ласка, введіть число (0 - 5000)', //'Please enter a valid number (0 - 5000)'
  MINUTE_RANGE: '1 - 60' //'Please enter a valid number (0 - 5000)'
};

export const inputValidators = {
  name: { checkFn: nameValidation, error: errorsMessages.NAME },
  email: { checkFn: emailValidation, error: errorsMessages.EMAIL },
  password: { checkFn: passwordValidation, error: errorsMessages.PASSWORD },
  phone: { checkFn: phoneValidation, error: errorsMessages.PHONE },
  website: { checkFn: urlValidation, error: errorsMessages.WEBSITE },
  url: { checkFn: urlValidation, error: errorsMessages.URL },
  numberRange: { checkFn: numberRangeValidation, error: errorsMessages.NUMBER_RANGE },
  minuteRange: { checkFn: minuteRangeValidation, error: errorsMessages.MINUTE_RANGE }
};
