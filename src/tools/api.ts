export const fetchApi = <T>(params: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) =>
    fetch(params, init)
        .then(response => response.json())
        .then(r => r as T);

