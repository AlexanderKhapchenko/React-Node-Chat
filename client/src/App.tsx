import React, { Suspense } from 'react';
import './App.css';
import Preloader from './components/preloader/preloader';

const Chat = React.lazy(() => import('./components/chat/chat'));

const App: React.FC = () => {
  return (
		<Suspense fallback={<Preloader />}>
		  <Chat 
				url='http://192.168.88.31:3050/api/messages'
			/>
		</Suspense>
  );
}

export default App;
