export interface SignUp {
    name: string,
    password: string,
    email: string
}

export interface Login {
    email: string,
    password: string
}

export interface Product {
    id: number,
    name: string,
    price: number,
    color: string,
    category: string,
    image: string,
    description: string
}