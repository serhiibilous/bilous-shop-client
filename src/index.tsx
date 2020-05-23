import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import { App } from '@Main/components'
import './i18n'

ReactDOM.render(<App />, document.getElementById('root'))
