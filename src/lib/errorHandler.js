export const errorHandler = ({name}) => {
    switch(name) {
        case 'Invalid Password' : 
            return {message : 'Invalid Credentials', status : 400};
        case 'Invalid Email' : 
            return {message : 'Invalid Credentials', status : 400};
        case 'Invalid Input' : 
            return {message : 'Invalid Input', status : 400};
        case 'Already Exist' : 
            return {message : 'User is Already Exist ', status : 400};
        case 'Not Found' : 
            return {message : 'Book is Not Found ', status : 400};
        case 'Invalid Extension' : 
            return {message : 'Your File Extension is Not Valid ', status : 400};
        default :
            return {message : 'Internal Server Error', status : 500};
    }
}

