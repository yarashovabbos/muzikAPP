// src/store.js
import create from 'zustand';

const useStore = create((set) => ({
  songs: [],
  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  removeSong: (id) => set((state) => ({
    songs: state.songs.filter((song) => song.id !== id),
  })),
}));

export default useStore;
