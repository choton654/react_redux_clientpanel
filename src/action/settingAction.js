import {
  DISEABLE_BALANCE_ON_ADD,
  DISEABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
} from './types';

export const setDiseableBalanceOnAdd = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  settings.diseableBalanceOnAdd = !settings.diseableBalanceOnAdd;

  localStorage.setItem(' settings', JSON.stringify(settings));
  return {
    type: DISEABLE_BALANCE_ON_ADD,
    payload: settings.setDiseableBalanceOnAdd,
  };
};
export const setDiseableBalanceOnEdit = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  settings.diseableBalanceOnEdit = !settings.diseableBalanceOnEdit;

  localStorage.setItem(' settings', JSON.stringify(settings));
  return {
    type: DISEABLE_BALANCE_ON_EDIT,
  };
};
export const setAllowRegistration = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  settings.allowRegistration = !settings.allowRegistration;

  localStorage.setItem(' settings', JSON.stringify(settings));
  return {
    type: ALLOW_REGISTRATION,
  };
};
