import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PopupHost } from './components/Popup/PopupHost';
import { AlertHost } from './components/Alert/AlertHost';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <PopupHost />
      <AlertHost />
    </Provider>
  );
}

export default App;
