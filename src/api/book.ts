import { BookListApiParams } from '@/types/books'
import axiosInstance from './axios'

export const getBookList = async ({
  page,
  size,
  category,
  keyword,
}: BookListApiParams) => {
  const response = await axiosInstance.get('/books', {
    params: { page, size, category, keyword },
  })
  return response.data
}

export const getBook = async (isbn: string) => {
  const response = await axiosInstance.get(`/books/${isbn}`)
  return response.data
}

export const getWishList = async ({
  page,
  size,
  category,
  keyword,
}: BookListApiParams) => {
  const response = await axiosInstance.get('/user/wish', {
    params: { page, size, category, keyword },
  })
  return response.data
}

export const getWish = async (isbn: string) => {
  const response = await axiosInstance.get(`/books/${isbn}/wish`)
  return response.data
}

export const postWish = async (isbn: string) => {
  const response = await axiosInstance.post(`/books/${isbn}/wish`)
  return response.data
}

export const deleteWish = async (isbn: string) => {
  const response = await axiosInstance.delete(`/books/${isbn}/wish`)
  return response.data
}
