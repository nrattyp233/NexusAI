import React from 'react';

export type ViewState = 'dashboard' | 'generator' | 'monetization' | 'settings';

export interface TrendData {
  name: string;
  value: number;
  sentiment: number; // -1 to 1
  growth: number;
}

export interface GeneratedContent {
  id: string;
  topic: string;
  title: string;
  body: string;
  type: ContentType;
  timestamp: number; // Unix timestamp
}

export enum ContentType {
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter',
  BLOG = 'Blog',
  EMAIL = 'Email'
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  subtext?: string;
}

export interface UserSettings {
  username: string;
  role: string;
  emailNotifications: boolean;
  autoSave: boolean;
  apiKey?: string;
}