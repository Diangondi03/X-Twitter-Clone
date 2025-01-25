import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router,Route, BrowserRouter, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Signup  from "./pages/Signup"
import Login from './pages/Login';
import {AuthProvider} from "./contexts/AuthContext"
import { ReloadProvider } from './contexts/ReloadContext';
import { ModalProvider } from './contexts/ModalContext';
import ProfileLayout from './components/Profile/Layout/ProfileLayout';
import Home from './pages/Home';
import Start from './pages/Start';
import Account from './pages/Account';
import ExpandedPost from './pages/ExpandedPost';
import BookmarkList from './pages/BookmarkList';
import Settings from './pages/Settings';
import Explore from './pages/Explore';
import Search from './pages/Search';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ReloadProvider>
        <ModalProvider>

          <Routes>
              <Route path='/' element={<Start/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/login' element={<Login/>}></Route>

              <Route path='/' element={<ProfileLayout/>}>
                <Route index path='home' element={<Home/>}></Route>
                <Route path='explore' element={<Explore/>}></Route>
                <Route path='search' element={<Search/>}></Route>
                <Route path='bookmark' element={<Home/>}></Route>
                <Route path='savedPosts' element={<BookmarkList/>}></Route>
                <Route path='user/:userId/*' element={<Account/>}></Route>

                <Route path="settings" element={<Settings/>}></Route>
                <Route path="post/:postId" element={<ExpandedPost/>}></Route>
                <Route path="*" element={<Home/>}></Route>
              </Route>
              
          </Routes>
        </ModalProvider>
      </ReloadProvider>
    </AuthProvider>
  </BrowserRouter>
)
