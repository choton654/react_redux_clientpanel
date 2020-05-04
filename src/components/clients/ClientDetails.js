import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';

class ClientDetails extends Component {
  state = {
    showbalanceUpdate: false,
    balanceupdateAmount: '',
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceupdateAmount } = this.state;

    const clientUpdate = { balance: parseFloat(balanceupdateAmount) };

    firestore
      .update({ collection: 'clients', doc: client.id }, clientUpdate)
      .then(
        this.setState({ showbalanceUpdate: false, balanceupdateAmount: '' })
      );
  };

  onDelete = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showbalanceUpdate, balanceupdateAmount } = this.state;

    let balanceForm = '';
    if (showbalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.onSubmit}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              name='balanceupdateAmount'
              placeholder='Add New Balance'
              value={balanceupdateAmount}
              onChange={this.onChange}
            />
            <div className='input-group-append'>
              <input
                type='submit'
                value='Update'
                className='btn btn-outline-dark'
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }
    if (client) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/' className='btn btn-link'>
                <i className='fas fa-arrow-circle-left' /> Basc To Dashboard
              </Link>
            </div>
            <div className='col-md-6'>
              <div className='btn-group float-right'>
                <Link to={`/client/edit/${client.id}`} className='btn btn-dark'>
                  Edit
                </Link>
                <button onClick={this.onDelete} className='btn btn-danger'>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className='card'>
            <h3 className='card-header'>
              {client.firstName} {client.lastName}
            </h3>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-8 col-sm-6'>
                  <h4>
                    Client Id:{' '}
                    <span className='text-secondary'>{client.id}</span>
                  </h4>
                </div>
                <div className='col-md-4 col-sm-6'>
                  <h3 className='pull-right'>
                    Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance === 0,
                      })}>
                      ${parseFloat(client.balance).toFixed(2)}{' '}
                    </span>
                    <small>
                      <a
                        href='#!'
                        onClick={() =>
                          this.setState({
                            showbalanceUpdate: !this.state.showbalanceUpdate,
                          })
                        }>
                        <i className='fas fa-pencil-alt' />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className='list-group'>
                <li className='list-group-item'>
                  Contact Email: {client.email}
                </li>
                <li className='list-group-item'>
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

ClientDetails.protoTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  }))
)(ClientDetails);
