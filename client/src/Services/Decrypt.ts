import { jwtDecode } from "jwt-decode";
export const token_descrypt = (encryptText: any) => {
  try {
    const decoded = jwtDecode(encryptText);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};
