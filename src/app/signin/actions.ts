'use server';

import { cookies } from 'next/headers';

import AuthService from '@/services/AuthService';

import { cookiesNames } from '@/constants/cookies-names';
import { updateAccessToken, updateRefreshToken } from '@/utils/user-credentials';

type SignInParams = {
	email: string;
	password: string;
}

export type SignInResponse = {
	accessToken: string;
	refreshToken: string;
};

export async function signIn({ email, password }: SignInParams): Promise<SignInResponse> {
	const response = await AuthService.signInService({ email, password }) as SignInResponse;

	updateAccessToken(response.accessToken);
	updateRefreshToken(response.refreshToken);

	return response;
}

export async function refreshToken() {
	const refreshTokenId = cookies().get(cookiesNames.refreshToken)?.value;
	const { accessToken, refreshToken } = await AuthService.refreshTokenService({ id: refreshTokenId || ''}) as SignInResponse;

	return {
		accessToken,
		refreshToken
	};
}
