import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { refreshToken } from './app/signin/actions';

import { basePath } from './services/utils/api';
import { checkIsDefaultNextRoute, checkIsPublicRoute } from '@/utils/check-routes';

import { APP_ROUTES } from '@/constants/app-routes';
import { cookiesNames } from '@/constants/cookies-names';

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (checkIsDefaultNextRoute(pathname)) {
		return NextResponse.next();
	}

	const isPublicRoute = checkIsPublicRoute(pathname);
	const accessToken = cookies().get(cookiesNames.accessToken)?.value;

	try {
		const response = await fetch(`${basePath}/auth/is-access-token-valid`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		});

		if (accessToken) {
			if (!isPublicRoute) {
				const middlewareResponse = NextResponse.next();

				if (response.status === 401) {
					const { accessToken, refreshToken: refreshTokenId } = await refreshToken();

					middlewareResponse.cookies.set({
						name: cookiesNames.accessToken,
						value: accessToken,
						httpOnly: true
					});

					middlewareResponse.cookies.set({
						name: cookiesNames.refreshToken,
						value: refreshTokenId,
						httpOnly: true
					});
				}

				return middlewareResponse;
			}

			const url = new URL(APP_ROUTES.private.home, req.nextUrl.origin);
			return NextResponse.redirect(url);
		}
	} catch {
		// Do nothing
	}

	if (isPublicRoute && pathname !== '/') return NextResponse.next();

	const url = new URL(APP_ROUTES.public.signIn, req.nextUrl.origin);
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ['/:path*']
};
