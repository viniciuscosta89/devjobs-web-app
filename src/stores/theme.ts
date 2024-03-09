import { ref } from 'vue'
import { defineStore } from 'pinia'

export type UserTheme = 'light' | 'dark'

const getTheme = (): UserTheme => {
  return localStorage.getItem('user-theme') as UserTheme
}

const getMediaPreference = (): UserTheme => {
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (hasDarkPreference) {
    return 'dark'
  } else {
    return 'light'
  }
}

export const useThemeStore = defineStore('theme', () => {
  const userTheme = ref<UserTheme>(getTheme() || getMediaPreference())

  function setTheme(theme: UserTheme): void {
    localStorage.setItem('user-theme', theme)
    document.documentElement.className = theme
  }

  function toggleTheme(): void {
    const activeTheme = localStorage.getItem('user-theme')
    if (activeTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return { userTheme, setTheme, toggleTheme }
})
