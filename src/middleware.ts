import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { APP_ROUTES } from '@/constants/app-routes';
import { checkIsPublicRoute } from '@/utils/check-is-public-route';

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if(pathname.includes('_next') || pathname.includes('/api')) {
		return NextResponse.next();
	}

	const isPublicRoute = checkIsPublicRoute(pathname);
	const isUserAuthenticated = !!req.cookies.get('next-auth.session-token')?.value;

	if(isUserAuthenticated) {
		if(!isPublicRoute) return NextResponse.next();

		const url = new URL(APP_ROUTES.private.historic, req.nextUrl.origin);
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
