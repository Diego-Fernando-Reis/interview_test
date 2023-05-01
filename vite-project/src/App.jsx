import './App.css'
import Rotas from '../Routes'
import { UserProvider } from './Contexts/UserContext'

function App() {

  return (
    <UserProvider>
      <Rotas/>
    </UserProvider>
  )
}

export default App
