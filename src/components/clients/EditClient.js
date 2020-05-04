import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class EditClients extends Component {
  constructor(props) {
    super(props);

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { client, firestore, history } = this.props;
    const updatedClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value,
    };

    firestore
      .update({ collection: 'clients', doc: client.id }, updatedClient)
      .then(history.push('/'));
  };
  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/' className='btn btn-link'>
                <i className='fas fa-arrow-circle-left' /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className='card'>
            <div className='card-header'>Update Client</div>
            <div className='card-body'>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    minLength='2'
                    required
                    ref={this.firstNameInput}
                    onChange={this.onChange}
                    defaultValue={client.firstName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    minLength='2'
                    required
                    ref={this.lastNameInput}
                    onChange={this.onChange}
                    defaultValue={client.lastName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    ref={this.emailInput}
                    onChange={this.onChange}
                    defaultValue={client.email}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    name='phone'
                    minLength='10'
                    ref={this.phoneInput}
                    onChange={this.onChange}
                    defaultValue={client.phone}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='balance'>Balance</label>
                  <input
                    type='text'
                    className='form-control'
                    name='balance'
                    ref={this.balanceInput}
                    onChange={this.onChange}
                    defaultValue={client.balance}
                    disabled={disableBalanceOnEdit}
                  />
                </div>
                <input
                  type='submit'
                  value='update'
                  className='btn btn-primary btn-block'
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

EditClients.protoTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings,
  }))
)(EditClients);
