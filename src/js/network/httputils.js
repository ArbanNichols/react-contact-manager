export const FETCH_URL = 'https://jsonplaceholder.typicode.com/users/';
const POST_HEADERS = { 'Content-type': 'application/json; charset=UTF-8' };

export function deleteContact(id) {
    fetch(FETCH_URL + id, { method: 'DELETE' });
}

export async function addContact(contact) {
    const response = await fetch(FETCH_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: POST_HEADERS,
    });
    const contacts = await response.json();

    return contacts;
}
