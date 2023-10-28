'use client';

import { NavLink } from './SidebarLink';
import { SignOutButton } from './SignOutButton';

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
						to='/home'
						icon={HomeIcon}
					/>

					<NavLink
						label='History'
						to='/history'
						icon={HistoryIcon}
					/>

					<NavLink
						label='Menu'
						to='/menu?tab=products'
						icon={MenuIcon}
					/>

					<NavLink
						label='Users'
						to='/users'
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
