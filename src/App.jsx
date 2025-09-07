import { useState } from 'react'
import './index.css'
import Nav from './components/nav'
import Manager from './components/manager'

function App() {

  return (<>
    <Nav/>
    <div className='flex flex-col items-center'>
    <Manager/>
    </div>
  </>)
}

export default App
