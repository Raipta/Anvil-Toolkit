import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ToolRouter from './pages/ToolRouter'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-iron-50 dark:bg-char-950">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/tools/:slug" element={<ToolRouter />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
