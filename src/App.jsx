import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import StaffList from './components/StaffList/StaffList'
import CreateStaff from './components/StaffList/CreateStaff'

function App() {

  return (
    <>
      <MainLayout>
        <div className='container'>
          <Routes>
            <Route path='/' element={<StaffList/>}/>
            <Route path='/create' element={<CreateStaff/>} />
          </Routes>
        </div>
      </MainLayout>
    </>
  )
}

export default App
