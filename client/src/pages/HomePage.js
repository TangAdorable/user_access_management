import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../routes';

import { getEmail } from '../services/authorize';
import AdminRoute from '../AdminRoute'; //ไม่ได้ใช้ ใช้ getEmail แทน

// pages

import ManageUsers from './management/ManageUsers';
import singleUserID from './management/singleUserID';
import EditLogData from './management/EditLogData';
import AddAppLog from './management/AddAppLog';
import AddApplication from './management/AddApplication';
import AddAccessApp from './management/AddAccessApp';
import AddNewUser from './management/AddNewUser';
import EditUserProfile from './management/EditUserProfile';
import Signin from './management/Signin';
import AppSystem from './admin/AppSystem';
import NotFoundPage from './examples/NotFound';


// components
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';



const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {' '}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{' '}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        //ตรวจสอบการ login ระบบ /หาก login เรียบร้อยแล้วจะสามารถเข้า url api ต่าง ๆ ได้
        //หากยังไม่ได้ login จะ redirect ไปที่หน้า /sign-in
        getEmail() ? (
          <div>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
              <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
            </main>
          </div>
        ) :
          (<Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />)
      } />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
 

    {/* pages */}
    <RouteWithSidebar exact path={Routes.AppSystem.path} component={AppSystem} />
    <RouteWithSidebar exact path={Routes.ManageUsers.path} component={ManageUsers} />
    <RouteWithSidebar exact path={Routes.singleUserID.path} component={singleUserID} />
    <RouteWithSidebar exact path={Routes.EditLogData.path} component={EditLogData} />
    <RouteWithSidebar exact path={Routes.AddNewUser.path} component={AddNewUser} />
    <RouteWithSidebar exact path={Routes.AddAppLog.path} component={AddAppLog} />
    <RouteWithSidebar exact path={Routes.AddApplication.path} component={AddApplication} />
    <RouteWithSidebar exact path={Routes.AddAccessApp.path} component={AddAccessApp} />
    <RouteWithSidebar exact path={Routes.EditUserProfile.path} component={EditUserProfile} />

    <Redirect to={Routes.NotFound.path} /> 
  </Switch>
);
