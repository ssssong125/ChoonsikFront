import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Board from './pages/Boards/Board';
import BoardDetail from './pages/Boards/BoardDetail';
import BoardRegist from './pages/admin/BoardRegist';
import BoardUpdate from './pages/admin/BoardUpdate';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>
          <Route path="board" element={ <Board/>}/>
          {/* <Route path="boards/:currentPage" element={ <Board/>}/> */}
          <Route path="board/:boardCode" element={ <BoardDetail/>}/>
          <Route path="regist" element={ <BoardRegist/>}/>
          <Route path="update/:boardCode" element={ <BoardUpdate/>}/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/register" element={ <Register/> }/>
          <Route path="*" element={ <Error/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;