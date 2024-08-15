const { default: URL } = require("@/lib/apiURL")


const loginUser = async(params) => {
    const response = await fetch(`${URL}/login`, {
        method : 'POST',
        body : JSON.stringify(params)
    })
    return response;
}

const registerUser = async(params) => {
    const response = await fetch(`${URL}/register`, {
        method : 'POST',
        body : JSON.stringify(params)
    })
    return response
}

const getUserByEmail = async(params) => {
    const response = await fetch(`${URL}/user/email`, {
        method : 'GET',
    })
    const data = await response.json();
    return data;
}

export{loginUser,registerUser,getUserByEmail};