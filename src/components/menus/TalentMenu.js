import React from 'react'
// import { BsFilePost, BsFillPersonFill } from 'react-icons/bs'
import { MenuItem } from './MenuItem'
import { useAuth } from '../../hooks'

export const TalentMenu = ( {mobile, menuopen, onclose} ) => {
	const { loadingViewer, viewer, isLoggedIn } = useAuth()
	if(loadingViewer || !viewer) return null
	if(viewer.roles.nodes[0].name !== "talent" || !isLoggedIn) return null
	return (
		<>
			{/* <MenuItem link="/talent/jobs" label="My Jobs"  menuopen={menuopen} onclose={onclose} /> */}
			<MenuItem mobile={mobile} link="/talent/account" label="Account"  menuopen={menuopen} onclose={onclose} />
		</>
	)
}
