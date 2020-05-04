import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../action/notifyAction';
import Alert from '../layouts/Alert';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { firebase, history, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password,
      })
      .then(history.push('/'))
      .catch((err) => notifyUser('Invalid login', 'error'));
  };

  render() {
    const { auth } = this.props;
    const { message, messageType } = this.props.notify;
    if (auth.uid) return <Redirect to='/' />;
    return (
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <div className='card'>
            <div className='card-body'>
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className='text-center pb-4 pt-3'>
                <span className='text-primary'>
                  <i className='fas fa-lock' /> Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    resource
                    className='form-control'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    resource
                    className='form-control'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type='submit'
                  value='Login'
                  className='btn btn-primary'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogIn.protoTypes = {
  firebase: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      auth: state.firebase.auth,
      notify: state.notify,
    }),
    { notifyUser }
  )
)(LogIn);
