import { UserType } from '../config/constants';

export type UserType = keyof typeof UserType;

console.log(UserType);

export type User = {
	id: string;
	name: string;
	email: string;
	type: UserType;
}
