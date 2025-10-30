import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUser from './pages/DashboardUser';
import DashboardVendor from './pages/DashboardVendor';
import DashboardManager from './pages/DashboardManager';
import EventCreation from './pages/EventCreation';
import ChatRoom from './pages/ChatRoom';
import Payments from './pages/Payments';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import VendorSearch from './pages/VendorSearch';
import TaskManagement from './pages/TaskManagement';
import MediaGallery from './pages/MediaGallery';
import DemoWalkthrough from './pages/DemoWalkthrough';
import PitchDemo from './pages/PitchDemo';
import Quotes from './pages/Quotes';
import AIPlanner from './pages/AIPlanner';
import Animations3DDemo from './pages/Animations3DDemo';
import JoinEvent from './pages/JoinEvent';
import VendorDetails from './pages/VendorDetails';
import EventPlanner from './pages/EventPlanner';
import Messages from './pages/Messages';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<DemoWalkthrough />} />
          <Route path="/3d-demo" element={<Animations3DDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard/user" element={
            <ProtectedRoute role="user">
              <DashboardUser />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/vendor" element={
            <ProtectedRoute role="vendor">
              <DashboardVendor />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/manager" element={
            <ProtectedRoute role="manager">
              <DashboardManager />
            </ProtectedRoute>
          } />
          
          <Route path="/event/create" element={
            <ProtectedRoute>
              <EventCreation />
            </ProtectedRoute>
          } />
          
          <Route path="/chat/:roomId" element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          } />
          
          <Route path="/payments" element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          } />
          
          <Route path="/rewards" element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/vendors" element={<VendorSearch />} />
          <Route path="/vendor-search" element={<VendorSearch />} />
          <Route path="/vendor/:vendorId" element={<VendorDetails />} />
          <Route path="/event-planner" element={
            <ProtectedRoute>
              <EventPlanner />
            </ProtectedRoute>
          } />
          <Route path="/pitch" element={<PitchDemo />} />
          
          <Route path="/join" element={
            <ProtectedRoute>
              <JoinEvent />
            </ProtectedRoute>
          } />
          
          <Route path="/join/:roomId" element={
            <ProtectedRoute>
              <JoinEvent />
            </ProtectedRoute>
          } />
          
          <Route path="/event/:eventId/tasks" element={
            <ProtectedRoute>
              <TaskManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/event/:eventId/media" element={
            <ProtectedRoute>
              <MediaGallery />
            </ProtectedRoute>
          } />
          
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          
          <Route path="/quotes" element={<AIPlanner />} />
          
          <Route path="/my-quotes" element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
