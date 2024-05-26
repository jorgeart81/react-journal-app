import { Note } from '@/stores/journal/journal.interface';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  displayName: string;
}

export interface CreateNewNoteRequest {
  uid: string;
  note: Note;
}

export interface LoadingNotesResponse {
  notes: Note[];
}

export interface SaveNoteRequest extends CreateNewNoteRequest {}

export interface DeleteNoteRequest {
  uid: string;
  id: string;
}
