import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App'
import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import './index.css'

const store=createStore(
  reducers,//reducers
  {},//estado inicial
  applyMiddleware(reduxThunk)
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>
)
