import { APP_ROUTES } from '@/constants/app-routes';

export function checkIsPublicRoute(asPath: string) {
	const appPublicRoutes = Object.values(APP_ROUTES.public);

	return appPublicRoutes.includes(asPath);
}

export function checkIsDefaultNextRoute(asPath: string) {
	const appDefaultRoutes = Object.values(APP_ROUTES.default);

	return appDefaultRoutes.some((route) => asPath.includes(route));
}
