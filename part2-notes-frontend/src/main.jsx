import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App-6'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)