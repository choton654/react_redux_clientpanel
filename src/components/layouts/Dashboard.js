import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layouts/Sidebar';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

const Dashboard = (props) => {
  const { auth } = props;
  if (!auth.uid) return <Redirect to='/login' />;
  return (
    <div className='row'>
      <div className='col-md-10'>
        <Clients />
      </div>
      <div className='col-md-2'>
        <Sidebar />
      </div>
    </div>
  );
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
  }))
)(Dashboard);
