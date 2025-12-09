import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Appointment } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  signup: (name: string, email: string) => boolean;
  logout: () => void;
  appointments: Appointment[];
  addAppointment: (appt: Omit<Appointment, 'id' | 'zoomLink'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Initial Data
const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, userId: 'u1', userName: 'Alex Johnson', date: '2025-12-10', time: '10:00 AM', professionalId: 'dr_chen', professionalName: 'Dr. Emily Chen, PhD', type: 'Video Call', zoomLink: 'https://zoom.us/j/101' },
  { id: 2, userId: 'u1', userName: 'Alex Johnson', date: '2025-12-17', time: '02:00 PM', professionalId: 'caleb_jones', professionalName: 'Caleb Jones, LCSW', type: 'Video Call', zoomLink: 'https://zoom.us/j/102' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const login = (email: string) => {
    // Simulating login
    if (email.includes('admin')) {
      setUser({ id: 'a1', name: 'Dr. Admin', email, role: 'admin' });
    } else {
      setUser({ id: 'u1', name: 'Alex Johnson', email, role: 'user' });
    }
    return true;
  };

  const signup = (name: string, email: string) => {
    setUser({ id: `u${Date.now()}`, name, email, role: 'user' });
    return true;
  };

  const logout = () => setUser(null);

  const addAppointment = (appt: Omit<Appointment, 'id' | 'zoomLink'>) => {
    const newId = appointments.length + 1;
    // Mock Zoom link generation
    const zoomLink = `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}?pwd=secure`;
    
    setAppointments([...appointments, { ...appt, id: newId, zoomLink, userName: user?.name }]);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, appointments, addAppointment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};