
import './App.css';
import {Routes,BrowserRouter,Route} from "react-router-dom"
import AddEditBlog from './pages/AddEditBlog';
import NotFounds from './pages/NotFounds';
import Blog from './pages/Blog';
import About from './pages/About';
import Home from './pages/Home';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <ToastContainer/>
      <div className='App'>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addBlog" element={<AddEditBlog/>} />
          <Route path="/editBlog/:id" element={<AddEditBlog/>} />
          <Route path="/blog/:id" element={<Blog/>} />
          <Route path="/about" element={<About/>} />
          <Route path="*" element={<NotFounds/>} />

        </Routes>
        </div>
      </BrowserRouter>
      
    </>
  );
}

export default App;
