import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import Home from '@/pages/Home';
import TermsAndConditions from '@/pages/user-agreements/TermsAndConditions';
import PrivacyPolicy from '@/pages/user-agreements/PrivacyPolicy';
import Commands from '@/pages/usage/Commands';
import { Status } from '@/pages/Status';
import Report from '@/pages/Report';
import NotFound from '@/pages/NotFound';
import Changelog from '@/pages/Changelog';
import Feedback from '@/pages/Feedback';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#111827] text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-agreements/terms" element={<TermsAndConditions />} />
            <Route path="/user-agreements/privacy" element={<PrivacyPolicy />} />
            <Route path="/usage/commands" element={<Commands />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/status" element={<Status />} />
            <Route path="/report" element={<Report />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;