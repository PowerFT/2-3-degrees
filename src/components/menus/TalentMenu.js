import React from 'react'
// import { BsFilePost, BsFillPersonFill } from 'react-icons/bs'
import { MenuItem } from './MenuItem'
import { useAuth } from '../../hooks'

export const TalentMenu = ( {menuopen, onclose} ) => {
	const { loadingViewer, viewer } = useAuth()
	if(loadingViewer || !viewer) return null
	if(viewer.roles.nodes[0].name !== "maker") return null
	return (
		<>
			<MenuItem link="/talent/myjobs" label="My Jobs"  menuopen={menuopen} onclose={onclose} />
			<MenuItem link="/talent/account" label="Account"  menuopen={menuopen} onclose={onclose} />
		</>
	)
}
