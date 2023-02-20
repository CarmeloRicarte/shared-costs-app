import { Home } from './pages/Home';
import { HomeProvider } from './pages/Home/context';

export default function App() {
  return (
    <div className='App'>
      <HomeProvider>
        <Home />
      </HomeProvider>
    </div>
  );
}
