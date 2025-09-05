export function getAuthData() {
    const token = localStorage.getItem('token');
    const User = JSON.parse(localStorage.getItem('User'));
    return { token, User };
}