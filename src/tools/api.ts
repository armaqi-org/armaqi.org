export const fetchApi = <T>(params: Parameters<typeof fetch>[0]) =>
    fetch(params)
        .then(response => response.json())
        .then(r => r as T);

