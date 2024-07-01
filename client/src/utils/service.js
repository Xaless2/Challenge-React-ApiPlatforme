

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

    let data;
    if (response.ok) {
        data = response.status === 204 ? null : await response.json();
    } else {
        data = await response.json();
        throw new Error(data.error.message);
    }

    return data;
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

export const getRequestById = async (url, id, headers = {}) => {
    const response = await fetch(`${url}/${id}`, {
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

export const updateRequest = async (url, body, headers = {}) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    });

    let data;
    if (response.ok) {
        data = response.status === 204 ? null : await response.json();
    } else {
        try {
            data = await response.json();
            throw new Error(data.error.message);
        } catch (e) {
            throw new Error('An error occurred while processing the request.');
        }
    }

    return data;
}

export const deleteRequest = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE'
    });

    let data;
    if (response.ok) {
        data = response.status === 204 ? null : await response.json();
    } else {
        data = await response.json();
        throw new Error(data.error.message);
    }

    return data;
}