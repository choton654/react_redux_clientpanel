import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setAllowRegistration,
  setDiseableBalanceOnAdd,
  setDiseableBalanceOnEdit,
} from '../../action/settingAction';

import React, { Component } from 'react';

class Settings extends Component {
  diseableBalanceOnAddChange = () => {
    const { setDiseableBalanceOnAdd } = this.props;
    setDiseableBalanceOnAdd();
  };

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  diseableBalanceOnEditChange = () => {
    const { setDiseableBalanceOnEdit } = this.props;
    setDiseableBalanceOnEdit();
  };

  render() {
    const {
      diseableBalanceOnAdd,
      diseableBalanceOnEdit,
      allowRegistration,
    } = this.props.settings;
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link className='btn btn-link'>
              <i className='fas fa-arrow-circle-left' /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>Edit Settings</div>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label>Allow Registration</label>{' '}
                <input
                  type='checkbox'
                  name='allowRegistration'
                  chaecked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>

              <div className='form-group'>
                <label>Diseable Balance On Add</label>{' '}
                <input
                  type='checkbox'
                  name='allowRegistration'
                  chaecked={!!diseableBalanceOnAdd}
                  onChange={this.diseableBalanceOnAddChange}
                />
              </div>

              <div className='form-group'>
                <label>Diseable Balance On Edit</label>{' '}
                <input
                  type='checkbox'
                  name='allowRegistration'
                  chaecked={!!diseableBalanceOnEdit}
                  onChange={this.diseableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }),
  {
    setAllowRegistration,
    setDiseableBalanceOnAdd,
    setDiseableBalanceOnEdit,
  }
)(Settings);
