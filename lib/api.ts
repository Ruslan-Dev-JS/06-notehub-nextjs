import axios from 'axios';
import type { Note } from '../types/note';
import type { FetchNotesResponse } from '../types/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  console.warn('NEXT_PUBLIC_NOTEHUB_TOKEN is not set in environment variables');
}

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token || ''}`,
  },
});

interface ApiNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;

  const { data } = await instance.get<ApiNotesResponse>('/notes', { params });
  
  const response: FetchNotesResponse = {
    items: data.notes,
    totalPages: data.totalPages,
  };
  
  return response;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  if (!id) throw new Error('Note id is required');
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  if (!id) throw new Error('Note id is required');
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};

interface CreateNoteData {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'; 
}

export const createNote = async (
  payload: CreateNoteData
): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', payload);
  return data;
};