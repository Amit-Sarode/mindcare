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
  userName?: string; // For admin view
  date: string; // YYYY-MM-DD
  time: string;
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
