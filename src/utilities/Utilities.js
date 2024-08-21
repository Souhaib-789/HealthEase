import i18n from "../translations/i18n";
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
  docHeader: async () => {
    let token = await Storage.getToken();
    return {

        Accept: '*/*',
        'Content-Type' : 'multipart/form-data',
        Authorization: `Bearer ${token}`,

    };
  },
}

export const isUrduLanguage = () => {
  return i18n.language === 'ur'; // 'ur' is the language code for Urdu
};

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
    id: 4,
    name: 'Gynecologist',
    value: 'Gynecologist',
  },
  {
    id: 5,
    name: 'Orthopedic',
    value: 'Orthopedic'
  },
  {
    id: 6,
    name: 'Pediatrician',
    value: 'Pediatrician'
  },
  {
    id: 7,
    name: 'Psychiatrist',
    value: 'Psychiatrist'
  },
  {
    id: 8,
    name: 'Neurologist',
    value: 'Neurologist'
  },
  {
    id: 9,
    name: 'Dermatologist',
    value: 'Dermatologist'
  },
  {
    id: 10,
    name: 'Ophthalmologist',
    value: 'Ophthalmologist'
  },
  {
    id: 11,
    name: 'Physiotherapist',
    value: 'Physiotherapist'
  },
  {
    id: 12,
    name: 'Gastroenterologist',
    value: 'Gastroenterologist'
  },
]