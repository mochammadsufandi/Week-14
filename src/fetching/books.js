import URL from "@/lib/apiURL";

const getAllBook = async() => {
    const response = await fetch(`${URL}/books`);
    const data = await response.json();
    return data;
}

const getBookById = async(id) => {
    const response = await fetch(`${URL}/books/${id}`);
    const data = await response.json();
    return data;
}

const addBook = async(params) => {
    let formData = new FormData();
    for(const key in params) {
        formData.append(key, params[key]);
    }

    const response = await fetch(`${URL}/books/uploads`, {
        method : 'POST',
        body : formData
    })
    return response;
}

const updateBook = async(params) => {
    const {id} = params
    let formData = new FormData();
    for(const key in params) {
        formData.append(key, params[key]);
    }   

    const response = await fetch(`${URL}/books/${id}`, {
        method : 'PUT',
        body : formData
    })
    return response;
}

const deleteBook = async(params) => {
    const {id} = params;
    console.log(id);
    const response = await fetch(`${URL}/books/${id}`, {
        method : 'DELETE',
    })
    return response;
}

export {getAllBook,getBookById,addBook,updateBook,deleteBook};