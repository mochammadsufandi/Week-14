import bcrypt from 'bcrypt';

const hashPassword = (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword,10);
}

const comparePassword = (plainTextPassword,hashedPassword) => {
    return bcrypt.compareSync(plainTextPassword,hashedPassword);
}

export {hashPassword,comparePassword};