import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LoginScreen from './commons/login/screens/loginScreens';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}

export default App;