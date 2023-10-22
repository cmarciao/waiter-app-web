'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

import { routesType } from '@/config/constants';

export function useSplashController() {
	const path = usePathname();
	const router = useRouter();

	const { data:  session } = useSession();

	useEffect(() => {
		const isPublicRoute = routesType.public.includes(path);

		if(session) {
			if(isPublicRoute) router.push('/users');
			else router.push(path);
		} else {
			if(!isPublicRoute) router.push('/signin');
			else router.push(path);
		}
	}, []);

	return null;
}
