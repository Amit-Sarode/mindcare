export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

export interface Appointment {
  id: number;
  userId: string;
  userName?: string;
  date: string;
  time: string; // Start time
  duration: string; // e.g., "30 min", "1 hr"
  price: number; // e.g., 100, 150
  professionalId: string;
  professionalName: string;
  type: 'Video Call';
  zoomLink: string;
}
export interface Service {
  name: string;
  description: string;
  iconPath: string;
}
