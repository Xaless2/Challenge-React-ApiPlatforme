export const baseUrl = "http://localhost:8000/api"; 
export const authUrl = "http://localhost:8000";

export const postRequest = async (url, body, headers = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Network response was not ok');
    }

    return await response.json();
};

export const getRequest = async (url, headers = {}) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

export const updateRequest = async (url, body, headers = {}) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Network response was not ok');
    }

    return await response.json();
}

export const getRequestById = async (url, headers = {}) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}


export const deleteRequest = async (url, headers = {}) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Network response was not ok');
    }

    return await response.json();
}
