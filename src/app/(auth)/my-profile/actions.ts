'use server';

import AuthService, { MeUpdateRequest } from '@/services/AuthService';

export async function getMyProfile() {
	const profile = await AuthService.me();
	return profile;
}

export async function updateMyProfile(data: MeUpdateRequest) {
	const profile = await AuthService.updateProfile(data);
	return profile;
}