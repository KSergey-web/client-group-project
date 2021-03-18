export interface LoginDTO {
  
    password: string;
  
    login: string;
  }

export interface UserEntity {
    _id: string;
  
    login: string;
}

export interface RegistrEntity extends UserEntity{
    token: string;
}