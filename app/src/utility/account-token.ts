export function retrieveToken() {
  return localStorage.getItem('marketflow-token');
}

export function storeToken(email: string) {
  return localStorage.setItem('marketflow-token', email);
}
