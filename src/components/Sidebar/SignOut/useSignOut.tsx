import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function useSignOut() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isLogoutModalOpened = searchParams.get('openedModal') === 'logout';

	const [isLoggingOut, setIsLoggingOut] = useState(false);

	function backToPreviousPage() {
		setIsLoggingOut(true);

		new Promise((res) => {
			res(router.back());
		}).finally(() => {
			setIsLoggingOut(false);
		});
	}

	function logout() {
		setIsLoggingOut(true);

		new Promise((res) => {
			res(signOut());
		}).finally(() => {
			setIsLoggingOut(false);
		});
	}

	return {
		pathname,
		isLoggingOut,
		isLogoutModalOpened,
		logout,
		backToPreviousPage
	};
}
