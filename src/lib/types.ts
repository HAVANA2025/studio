
import type { Timestamp } from 'firebase/firestore';

export interface Announcement {
  id: string;
  title: string;
  text: string;
  category: 'General' | 'Events' | 'Workshops' | 'Results';
  createdAt: Timestamp;
  date: string;
  link?: string;
  linkText?: string;
  imageUrl?: string;
}

export type Event = {
  id: string;
  title: string;
  details: string;
  date: string;
  location: string;
  registrationLink?: string;
  linkText?: string;
  whatsappLink?: string;
  imageUrl?: string;
  createdAt: Timestamp;
};

export type UserCreationRequest = {
    id: string;
    name: string;
    email: string;
    role: 'Executive Board' | 'Club Member';
    phone?: string;
    requestedBy: string;
    requestedAt: Timestamp;
}
