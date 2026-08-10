import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import Projects from './pages/Projects';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { getStoredData, saveStoredData, getCurrentUser, setCurrentUser as setStorageUser } from './data/dummyData';
import './styles/global.css';

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [data, setData] = useState(getStoredData());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [notifications, setNotifications] = useState(data.notifications || []);

  // Sync data to localStorage
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  // Sync user state to localStorage
  const handleSetCurrentUser = (user) => {
    setCurrentUser(user);
    setStorageUser(user);
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'Home':
        return <Home setActivePage={setActivePage} currentUser={currentUser} />;
      case 'Login':
        return <Login setActivePage={setActivePage} data={data} setCurrentUser={handleSetCurrentUser} />;
      case 'Register':
        return <Register setActivePage={setActivePage} data={data} setData={setData} setCurrentUser={handleSetCurrentUser} />;
      case 'Dashboard':
        return <Dashboard setActivePage={setActivePage} currentUser={currentUser} data={data} setData={setData} />;
      case 'Clubs':
        return <Clubs data={data} setData={setData} currentUser={currentUser} />;
      case 'Projects':
        return <Projects data={data} setData={setData} currentUser={currentUser} />;
      case 'Search':
        return <Search data={data} setActivePage={setActivePage} />;
      case 'Profile':
        return <Profile currentUser={currentUser} setCurrentUser={handleSetCurrentUser} data={data} setData={setData} />;
      default:
        return <Home setActivePage={setActivePage} currentUser={currentUser} />;
    }
  };

  const showSidebar = ['Dashboard', 'Clubs', 'Projects', 'Search', 'Profile'].includes(activePage);

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        setCurrentUser={handleSetCurrentUser}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <div className="main-body">
        {showSidebar && (
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        )}
        <main className="content-area">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
