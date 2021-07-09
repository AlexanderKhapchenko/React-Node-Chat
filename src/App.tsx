import React, { Suspense } from 'react';
import './App.css';
import Preloader from './components/preloader/preloader';

const Chat = React.lazy(() => import('./components/chat/chat'));

const App: React.FC = () => {
  return (
		<Suspense fallback={<Preloader />}>
		  <Chat 
				url='https://edikdolynskyi.github.io/react_sources/messages.json'
			/>
		</Suspense>
  );
}

export default App;
