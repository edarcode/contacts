class ContactsBack {
  base = "https://contacts-back-6btv.onrender.com";
  register = `${this.base}/auth/signup`;
  login = `${this.base}/auth/login`;
  refreshToken = `${this.base}/auth/refresh-token`;
  accountContacts = `${this.base}/contacts/get-contacts`;
  editcontact = `${this.base}/contacts/update-contact`;
  deleteContact = `${this.base}/contacts/remove-contact`;
  addContact = `${this.base}/contacts/create-contact`;
}

export const CONTACTS_BACK_URL = new ContactsBack();
