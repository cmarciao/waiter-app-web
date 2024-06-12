import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signOut } from './actions';

export function useSignOut() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isLogoutModalOpened = searchParams.get('openedModal') === 'logout';

	const [isLoggingOut, setIsLoggingOut] = useState(false);

	function backToPreviousPage() {
		router.back();
	}

	async function logout() {
		setIsLoggingOut(true);

		await signOut();

		setIsLoggingOut(false);
	}

	return {
		pathname,
		isLoggingOut,
		isLogoutModalOpened,
		logout,
		backToPreviousPage
	};
}
