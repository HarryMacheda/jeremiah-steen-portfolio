import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout.tsx';
import Home from './views/home.tsx';
import About from './views/about.tsx';
import ProjectPage from './views/project.tsx';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
