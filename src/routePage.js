import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function RoutePage() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />

        <Route path="/adminPage" element={<AdminPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default RoutePage;
