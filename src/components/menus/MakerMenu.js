import React from 'react'
// import { BsFilePost, BsFillPersonFill } from 'react-icons/bs'
import { MenuItem } from './MenuItem'
import { useAuth } from '../../hooks'

export const MakerMenu = ( {menuopen, onclose} ) => {
	const { loadingViewer, viewer, isLoggedIn } = useAuth()
	if(loadingViewer || !viewer) return null
	if(viewer.roles.nodes[0].name !== "maker" || !isLoggedIn) return null
	return (
		<>
			<MenuItem link="/maker/jobs" label="My Opportunities"  menuopen={menuopen} onclose={onclose}/>
			<MenuItem link="/maker/jobs/post" label="Post an Opportunity"  menuopen={menuopen} onclose={onclose}/>
			<MenuItem link="/maker/account" label="Account"  menuopen={menuopen} onclose={onclose}/>
		</>
	)
}
