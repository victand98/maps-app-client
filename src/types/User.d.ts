declare namespace UserModel {
  export interface UserResponse {
    email: string;
    __v: number;
    createdAt: string;
    firstName: string;
    lastName: string;
    status: boolean;
    updatedAt: string;
    id: string;
  }

  export type UserValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword?: string;
    status?: boolean;
  };

  export interface UsersPageProps {
    users: UserResponse[];
  }

  export interface NewUserPageProps {}
}

export { UserModel };
