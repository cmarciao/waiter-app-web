'use client';

import { APP_ROUTES } from '@/constants/app-routes';
import { NavLink } from './SidebarLink';
import { SignOutButton } from './SignOut/SignOutButton';

import {
	HomeIcon,
	HistoryIcon,
	MenuIcon,
	Users2Icon,
	UserCircle2
} from 'lucide-react';

export function Sidebar() {
	return (
		<aside className='flex'>
			<nav className='max-w-[108px] w-full h-screen flex flex-col items-center justify-between fixed'>
				<div className='flex mt-10'>
					<h2 className='font-bold'>W</h2>
					<h2 className='font-thin'>A</h2>
				</div>

				<div>
					<NavLink
						label='Home'
						to={APP_ROUTES.private.home}
						icon={HomeIcon}
					/>

					<NavLink
						label='Historic'
						to={`${APP_ROUTES.private.historic}?orderBy=desc`}
						icon={HistoryIcon}
					/>

					<NavLink
						label='Menu'
						to={`${APP_ROUTES.private.menu}?tab=products`}
						icon={MenuIcon}
					/>

					<NavLink
						label='Users'
						to={APP_ROUTES.private.users}
						icon={UserCircle2}
					/>
				</div>

				<div>
					<NavLink
						label='My Profile'
						to='/my-profile'
						icon={Users2Icon}
					/>

					<SignOutButton />
				</div>
			</nav>
		</aside>
	);
}
