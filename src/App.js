import './App.css';
import AuthProvider from './components/Context/AuthProvider';
import { store } from './features/store';
import Routes from './routes';
import { Provider } from 'react-redux';
function App() {

    return (
        <AuthProvider>
            <Provider store={store}>
                <Routes />
            </Provider>
        </AuthProvider>
    );
}

export default App;
