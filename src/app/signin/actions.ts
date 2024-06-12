'use server';

import { cookies } from 'next/headers';

import AuthService from '@/services/AuthService';

import { APIError } from '@/errors/APIError';
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
	try {
		const response = await AuthService.signInService({ email, password }) as SignInResponse;

		updateAccessToken(response.accessToken);
		updateRefreshToken(response.refreshToken);

		return response;
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function refreshToken() {
	try {
		const refreshTokenId = cookies().get(cookiesNames.refreshToken)?.value;
		const { accessToken, refreshToken } = await AuthService.refreshTokenService({ id: refreshTokenId || ''}) as SignInResponse;

		return {
			accessToken,
			refreshToken
		};
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}
