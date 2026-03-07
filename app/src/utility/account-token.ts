export function retrieveToken() {
  return localStorage.getItem('marketflow-token');
}

export function storeToken(token: string) {
  localStorage.setItem('marketflow-token', token);
}
