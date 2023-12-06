import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { APP_ROUTES } from '@/constants/app-routes';
import { checkIsDefaultRoute, checkIsPublicRoute } from '@/utils/check-routes';

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if(checkIsDefaultRoute(pathname)) {
		return NextResponse.next();
	}

	const isPublicRoute = checkIsPublicRoute(pathname);
	const isUserAuthenticated = !!req.cookies.get('next-auth.session-token')?.value;

	if(isUserAuthenticated) {
		if(!isPublicRoute) return NextResponse.next();

		const url = new URL(APP_ROUTES.private.home, req.nextUrl.origin);
		return NextResponse.redirect(url);
	} else {
		if(isPublicRoute && pathname !== '/') return NextResponse.next();

		const url = new URL(APP_ROUTES.public.signIn, req.nextUrl.origin);
		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: ['/:path*']
};
