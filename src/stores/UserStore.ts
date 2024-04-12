import type { Interest, User } from '@/types/Pinia'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { retrieveUser, updateUserGender } from '@/services/User'
import { deleteInterest, saveSelectedInterest } from '@/services/Interests'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>()
  const isAuthenticated = computed(() => !!user.value?.id)

  const retrieveUserData = async () => {
    const data = await retrieveUser()
    user.value = data
  }

  const updatePhotos = (imageObj: { id: number; url: string }) => {
    user.value!.photos = [...user.value!.photos, imageObj]
  }
  const removePhoto = (id: number) => {
    user.value!.photos = user.value!.photos.filter((photo) => photo.id !== id)
  }

  const clearUser = (): void => (user.value = undefined)

  const removeInterest = async (id: number) => {
    const status = await deleteInterest(id)
    if (status === 204) {
      user.value!.interests = user.value!.interests.filter((i) => i.id !== id)
    }
  }

  const addInterest = async (interest: Interest) => {
    const status = await saveSelectedInterest(interest.id)
    if (status === 201) {
      user.value!.interests = [...user.value!.interests, interest]
    }
  }

  const updateGender = async (gender: User['gender']) => {
    const status = await updateUserGender(gender)
    if (status === 204) user.value!.gender = gender
  }

  return {
    user,
    isAuthenticated,
    retrieveUserData,
    clearUser,
    updatePhotos,
    removePhoto,
    addInterest,
    removeInterest,
    updateGender
  }
})
