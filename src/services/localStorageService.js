export const KEY_TOKEN = "accessToken";
export const EXPIRATION_TIME = "tokenExpiration";

export const setToken = (accessToken) => {
    const expirationTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem(KEY_TOKEN, accessToken);
    localStorage.setItem(EXPIRATION_TIME, expirationTime);
};

export const getToken = () => {
    const accessToken = localStorage.getItem(KEY_TOKEN);
    const expirationTime = localStorage.getItem(EXPIRATION_TIME);

    if (!accessToken || !expirationTime) {
        return null;
    }

    const now = new Date().getTime();

    if (now > expirationTime) {
        localStorage.removeItem(KEY_TOKEN);
        localStorage.removeItem(EXPIRATION_TIME);
        window.location.reload();
        return null;
    }

    return accessToken;
};

export const removeToken = () => {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(EXPIRATION_TIME);
};
