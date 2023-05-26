import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const apiUrl = "https://api-app-notes-ajvs.onrender.com";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
  }),
  actions: {
    async fetchNotes() {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/api/notes`, {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        this.notes = response.data;
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    },
    async createNote(newNote) {
      try {
        const authStore = useAuthStore();
        const response = await axios.post(`${apiUrl}/api/notes`, newNote, {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        const createdNote = response.data;
        this.notes.push(createdNote);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    },
    async deleteNote(id) {
      try {
        const authStore = useAuthStore();
        await axios.delete(`${apiUrl}/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        this.notes = this.notes.filter((note) => note.id !== id);
      } catch (error) {
        console.error(`Error deleting note with id ${id}:`, error);
      }
    },
    async updateNote(id, updatedNote) {
      try {
        const authStore = useAuthStore();
        await axios.put(`${apiUrl}/api/notes/${id}`, updatedNote, {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        const index = this.notes.findIndex((note) => note.id === id);
        if (index !== -1) {
          this.notes[index] = { ...this.notes[index], ...updatedNote };
        }
      } catch (error) {
        console.error(`Error updating note with id ${id}:`, error);
      }
    },
    async fetchNoteById(id) {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching note with id ${id}:`, error);
        return null;
      }
    },
  },
});
