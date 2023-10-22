import { NavLink } from './NavLink';

import homeImage from 'public/images/home.svg';
import historyImage from 'public/images/history.svg';
import menuImage from 'public/images/menu.svg';
import usersImage from 'public/images/users.svg';
import myProfileImage from 'public/images/my-profile.svg';
import exitImage from 'public/images/exit.svg';

import activedHomeImage from 'public/images/actived-home.svg';
import activedHistoryImage from 'public/images/actived-history.svg';
import activedMenuImage from 'public/images/actived-menu.svg';
import activedUsersImage from 'public/images/actived-users.svg';

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
						alt='Home'
						to='/home'
						icon={homeImage}
						activedIcon={activedHomeImage}
					/>

					<NavLink
						label='History'
						alt='History'
						to='/history'
						icon={historyImage}
						activedIcon={activedHistoryImage}
					/>

					<NavLink
						label='Menu'
						alt='Menu'
						to='/menu'
						icon={menuImage}
						activedIcon={activedMenuImage}
					/>

					<NavLink
						label='Users'
						alt='Users'
						to='/users'
						icon={usersImage}
						activedIcon={activedUsersImage}
					/>
				</div>

				<div>
					<NavLink
						label='My Profile'
						alt='My Profile'
						to='/my-profile'
						icon={myProfileImage}
						activedIcon={activedMenuImage}
					/>

					<NavLink
						label='Exit'
						alt='Exit'
						to='/exit'
						icon={exitImage}
						activedIcon={activedUsersImage}
					/>
				</div>
			</nav>
		</aside>
	);
}
