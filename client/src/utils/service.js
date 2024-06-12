

export const baseUrl = "http://localhost:8000/api"; 
export const authUrl = "http://localhost:8000";


export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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



export const getRequest = async (url) => {
    const response = await fetch(url);

    let data;

    if (response.ok) {
        data = response.status === 204 ? null : await response.json();
    }
    else {
        data = await response.json();
        throw new Error(data.error.message);
    }



    return data;
}

export const updateRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
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