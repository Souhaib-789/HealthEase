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
    }}