export async function api(url: string, options: RequestInit) {
    const isFormData = options.body instanceof FormData;

    return fetch(url, {
        ...options,
        headers: isFormData ? options.headers : {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    }).then(async (res) => {
        const data = res.json().catch(() => null);
        if (!res.ok) {
            throw new Error('خطایی رخ داد');
        }
        return data;
    });
}
