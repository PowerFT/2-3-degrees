import React from 'react'
// import { BsFilePost, BsFillPersonFill } from 'react-icons/bs'
import { MenuItem } from './MenuItem'

export const TalentMenu = ( {menuopen} ) => {
	return (
		<>
			<MenuItem link="/talent/myjobs" label="My Jobs"  menuopen={menuopen}/>
			<MenuItem link="/talent/account" label="Account"  menuopen={menuopen}/>
		</>
	)
}
