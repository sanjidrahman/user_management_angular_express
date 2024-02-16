export interface IUserModel {
    userData: IUserModel
    id: number
    name: string
    email: string
    password: string
    isVerified: boolean
    createdAt: string
    updatedAt: string
}

export interface ISuccessResp {
    message: string
    token: string
}

export interface IUserRegModel {
    name: string
    email: string
    password: string
    confirmpass: string
}

export interface IUserLogModel {
    email: string
    password: string
}