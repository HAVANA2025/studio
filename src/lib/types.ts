import type { Timestamp } from 'firebase/firestore';

export interface Announcement {
  id: string;
  title: string;
  text: string;
  createdAt: Timestamp | string; // Allow string for new objects, but Firestore will store it as Timestamp
  date: string;
  link?: string;
  linkText?: string;
  imageUrl?: string;
  pdfUrl?: string;
};
