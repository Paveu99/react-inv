import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Header } from './views/Header'
import { HomePage } from './views/HomePage'
import { ProtectedLoginRoute } from './helpers/ProtectedLoginRoute'
import { ProtectedRoute } from './helpers/ProtectedRoute'
import { LoginView } from './views/LoginView'
import { RegisterView } from './views/RegisterView'
import { LogoutForm } from './views/LogoutView'
import { NotFoundView } from './views/NotFoundView'
import { TransferView } from './views/TransferView'
import { HistoryView } from './views/HistoryView'
import { SessionExpired } from './views/SessionExpired'

function App() {

  return <div className='App'>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user/login' element={<ProtectedLoginRoute element={<LoginView />} />} />
      <Route path='/user/register' element={<ProtectedLoginRoute element={<RegisterView />} />} />
      <Route path='/user/logout' element={<ProtectedRoute element={<LogoutForm />} />} />
      <Route path='/transfer/add' element={<ProtectedRoute element={<TransferView />} />} />
      <Route path='/transfer/history' element={<ProtectedRoute element={<HistoryView />} />} />
      <Route path='*' element={<NotFoundView />} />
      <Route path='/session-expired' element={<SessionExpired />} />
    </Routes>
  </div>
}

export default App
