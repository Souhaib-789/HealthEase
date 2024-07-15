import { Storage } from "./AsyncStorage";

export const headers = {
  config: async () => {
    let token = await Storage.getToken();
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  },
  multiPart: async () => {
    let token = await Storage.getToken();
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
  },
}

export const doctorCategories = [
  {
    id: 1,
    name: 'Cardiologist',
    value: 'Cardiologist'
  },
  {
    id: 2,
    name: 'Dentist',
    value: 'Dentist'
  },
  {
    id: 3,
    name: 'General Physician',
    value: 'General Physician',
  },
  {
    id: 3,
    name: 'Gynecologist',
    value: 'Gynecologist',
  },
  {
    id: 4,
    name: 'Orthopedic',
    value: 'Orthopedic'
  },
  {
    id: 5,
    name: 'Pediatrician',
    value: 'Pediatrician'
  },
  {
    id: 6,
    name: 'Psychiatrist',
    value: 'Psychiatrist'
  },
  {
    id: 7,
    name: 'Neurologist',
    value: 'Neurologist'
  },
  {
    id: 8,
    name: 'Dermatologist',
    value: 'Dermatologist'
  },
  {
    id: 9,
    name: 'Ophthalmologist',
    value: 'Ophthalmologist'
  },
  {
    id: 10,
    name: 'Physiotherapist',
    value: 'Physiotherapist'
  },
  {
    id: 11,
    name: 'Gastroenterologist',
    value: 'Gastroenterologist'
  },
]