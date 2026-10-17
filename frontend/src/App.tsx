import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PopupHost } from './components/Popup/PopupHost';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <PopupHost />
    </Provider>
  );
}

export default App;
