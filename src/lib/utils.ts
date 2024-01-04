
import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

// import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(timeString: string): string {
  const time: Date = new Date(`2000-01-01T${timeString}`);
  const hours: number = time.getHours();
  const minutes: number = time.getMinutes();

  const period: string = hours >= 12 ? 'PM' : 'AM';
  const formattedHours: number = hours % 12 || 12;
  const formattedMinutes: string = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export function formatDate(dateString: string): {month: string, day: number, year: number, daySuffix: string} {
  const date: Date = new Date(dateString);
  const monthNames: string[] = [
      'JAN', 'FEB', 'MAR', 'APR', 'May', 'JN', 'JL',
      'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'
  ];

  //ToDo change DB to store Date objects not strings!!!
  // const dayNames: string[] = [
  //     'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
  // ];

  const day: number = date.getDate();
  // Fix: Add null check to ensure the value is not undefined
  const month: string = monthNames[date.getMonth()] ?? '';
  const year: number = date.getFullYear();

  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
  } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
  }

  return {month: month, day: day, year: year, daySuffix: daySuffix};
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}




export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}



// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}
