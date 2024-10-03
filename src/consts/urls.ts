class ContactsBack {
  base = "https://contacts-back-6btv.onrender.com";
  register = `${this.base}/auth/signup`;
  login = `${this.base}/auth/login`;
  refreshToken = `${this.base}/auth/refresh-token`;
}

export const CONTACTS_BACK_URL = new ContactsBack();
