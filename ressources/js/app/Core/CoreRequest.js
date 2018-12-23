window.Core = window.Core || {};

Core.CoreRequest = class CoreRequest {
    static async get(url) {
        const fetchResult = await fetch(url, {
            method: 'GET'
        });

        if (!fetchResult.ok) {
            const errMessage = await fetchResult.json();
            throw new Core.HTTPRequestError(`Status code: ${fetchResult.status}. Cannot reach: ${url}\n\nServer result: ${errMessage.message}`);
        }

        return await fetchResult.json();
    }

    static async post(url, data) {
        const fetchResult = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!fetchResult.ok) {
            const errMessage = await fetchResult.json();
            throw new Core.HTTPRequestError(`Status code: ${fetchResult.status}. Cannot reach: ${url}\n\nServer result: ${errMessage.message}`);
        }

        return await fetchResult.json();
    }

    static async put(url, data) {
        const fetchResult = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!fetchResult.ok) {
            const errMessage = await fetchResult.json();
            throw new Core.HTTPRequestError(`Status code: ${fetchResult.status}. Cannot reach: ${url}\n\nServer result: ${errMessage.message}`);
        }

        return await fetchResult.json();
    }

    static async delete(url) {
        const fetchResult = await fetch(url, {
            method: 'DELETE'
        });

        if (!fetchResult.ok) {
            const errMessage = await fetchResult.json();
            throw new Core.HTTPRequestError(`Status code: ${fetchResult.status}. Cannot reach: ${url}\n\nServer result: ${errMessage.message}`);
        }

        return await fetchResult.json();
    }
};

Core.HTTPRequestError = class HTTPRequestError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, HTTPRequestError);
    }
};