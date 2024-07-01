export interface EventItem {
  id: number;
  image: string;
  date: Date;
  time: string;
  topic: string;
  message: string;
  venue: string;
}

export interface TabsTileCardProps {
  name: string;
  icon: string;
  buttonpress: () => void;
  selected: boolean;
}

export interface EventItem {
  id: number;
  user_id: number;
  form_id: number;
  topic: string;
  message: string;
  image: string;
  venue: string;
  duration: string;
  date: Date;
  time: string;
  active: boolean | number;
  slug: string;
  time_to: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export type EventData = EventItem;
