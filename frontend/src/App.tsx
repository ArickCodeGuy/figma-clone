import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
