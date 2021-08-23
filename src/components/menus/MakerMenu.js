import React from 'react'
// import { BsFilePost, BsFillPersonFill } from 'react-icons/bs'
import { MenuItem } from './MenuItem'

export const MakerMenu = ( {menuopen} ) => {
	return (
		<>
			<MenuItem link="/maker/myjobs" label="My Jobs"  menuopen={menuopen}/>
			<MenuItem link="/maker/jobs/post" label="Post a Job"  menuopen={menuopen}/>
			<MenuItem link="/maker/account" label="Account"  menuopen={menuopen}/>
		</>
	)
}
