import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import NoticesScreen from './screens/NoticesScreen';
import EventsScreen from './screens/EventsScreen';
import TimetableScreen from './screens/TimetableScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import NotesScreen from './screens/NotesScreen';
import LmsScreen from './screens/LmsScreen';
import FeesScreen from './screens/FeesScreen';
import ClubsScreen from './screens/ClubsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import AdminScreen from './screens/AdminScreen';
import ProfileScreen from './screens/ProfileScreen';
import MainLayout from './components/layout/MainLayout';
import { motion, AnimatePresence } from 'motion/react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardScreen />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/notices" element={
              <ProtectedRoute>
                <MainLayout>
                  <NoticesScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/events" element={
              <ProtectedRoute>
                <MainLayout>
                  <EventsScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/timetable" element={
              <ProtectedRoute>
                <MainLayout>
                  <TimetableScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/attendance" element={
              <ProtectedRoute>
                <MainLayout>
                  <AttendanceScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/lms" element={
              <ProtectedRoute>
                <MainLayout>
                  <LmsScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/fees" element={
              <ProtectedRoute>
                <MainLayout>
                  <FeesScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/clubs" element={
              <ProtectedRoute>
                <MainLayout>
                  <ClubsScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/feedback" element={
              <ProtectedRoute>
                <MainLayout>
                  <FeedbackScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfileScreen />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <AdminRoute>
                <MainLayout>
                  <AdminScreen />
                </MainLayout>
              </AdminRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}
