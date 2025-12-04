import { LucideIcon } from 'lucide-react';

// 后端返回的数据结构
export interface TrackFromAPI {
  _id: string;
  title: string;
  Field: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
  'Update-Date': number;
  'Percent-Complete': number;
  like: boolean;
  archive: boolean;
}

// 前端使用的数据结构
export interface Track {
  id: string;
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
