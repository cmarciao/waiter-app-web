import { USER_TYPE } from '@/constants/user-type';

export type UserType = keyof typeof USER_TYPE;

export type User = {
	id: string;
	name: string;
	email: string;
	password?: string;
	type: UserType;
}

export type IUserRequest = Omit<User, 'id'>;

export type IUserResponse = Omit<User, 'password'>;
