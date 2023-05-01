
import './App.css'
import Rotas from '../Routes'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <Rotas/>
    </Provider>
  )
}

export default App
