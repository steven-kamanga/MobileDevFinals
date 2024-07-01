import { EventData } from "@/interfaces";

class Event {
  id: number;
  userId: number;
  formId: number;
  topic: string;
  message: string;
  image: string;
  venue: string;
  duration: string;
  date: Date;
  time: string;
  active: boolean;
  slug: string;
  timeTo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(eventData: EventData) {
    this.id = eventData.id;
    this.userId = eventData.user_id;
    this.formId = eventData.form_id;
    this.topic = eventData.topic;
    this.message = eventData.message;
    this.image = eventData.image;
    this.venue = eventData.venue;
    this.duration = eventData.duration;
    this.date = new Date(eventData.date);
    this.time = eventData.time;
    this.active = Boolean(eventData.active);
    this.slug = eventData.slug;
    this.timeTo = eventData.time_to;
    this.createdAt = new Date(eventData.created_at);
    this.updatedAt = new Date(eventData.updated_at);
  }

  isActive(): boolean {
    return this.active === true;
  }

  getFormattedTime(): string {
    return this.time;
  }

  getFormattedDate(): string {
    return `${this.date.getFullYear()}-${(this.date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${this.date.getDate().toString().padStart(2, "0")}`;
  }
}

export default Event;
