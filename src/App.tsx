import React, { FC, Suspense, useEffect } from 'react';
//import AppRouter from './components/AppRouter';
import './App.css';
import { Icon } from './components/Icon/Icon';

const App: FC = () => {
	//const { setUser, setIsAuth } = useActions();

	// useEffect(() => {
	// 	if (localStorage.getItem('auth')) {
	// 		setUser({ username: localStorage.getItem('username' || '') } as IUser);
	// 		setIsAuth(true);
	// 	}
	// }, []);

	return (
		<>
			{/* <Suspense fallback={null}> */}
			{/* <Redirects /> */}
			{/* <Routes>
          <Route path={allIn(absRoutes.auth.main)} element={<Auth />} />
          <Route path={allIn(absRoutes.jobs.main)} element={<Jobs />} />
          <Route path={allIn(absRoutes.callSheetConfirm.main)} element={<CallSheetConfirm />} />

          <Route path="/" element={<PageLayout />}>
            <Route path={allIn(absRoutes.dashboard.main)} element={<Dashboard />} />
            <Route path={allIn(absRoutes.contacts.main)} element={<Contacts />} />
            <Route path={allIn(absRoutes.locations.main)} element={<Locations />} />
            <Route path={allIn(absRoutes.team.main)} element={<Team />} />
            <Route index element={<Navigate to={absRoutes.dashboard.main} />} />
          </Route>
        </Routes> */}
			{/* </Suspense> */}

			{/* <Auth /> */}

			{/* Account window */}
			{/* <Account /> */}

			{/* Toast message */}
			{/* <ToastMessage /> */}
		</>
	);
};

export default App;
