export interface Event {
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    petAllowed: boolean;
    organizer: Organizer;
}

export interface Student {
  id: number,
  studentId: string,
  name: string,
  surname: string,
  gpa: number,
  image: string
}

export interface MessageState {
  message: string
}
  
export interface EventState {
  event: Event | null
}

export interface Organizer{
  id: number,
  name: string,
}