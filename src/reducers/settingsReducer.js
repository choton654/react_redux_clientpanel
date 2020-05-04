import {
  DISEABLE_BALANCE_ON_ADD,
  DISEABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
} from '../action/types';

export const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case DISEABLE_BALANCE_ON_ADD:
      return {
        ...state,
        diseableBalanceOnAdd: action.payload,
      };
    case DISEABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        diseableBalanceOnEdit: action.payload,
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload,
      };
    default:
      return state;
  }
};
