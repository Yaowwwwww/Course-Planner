import { LucideIcon } from 'lucide-react';

export interface Track {
  id: number;
  title: string;
  course: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  updated: string;
  progress: number;
  favorite: boolean;
  archived: boolean;
}

export type TabType = 'recent' | 'favorites' | 'archive';
