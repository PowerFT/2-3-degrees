import React from 'react'
import { Divider, Stack } from '@chakra-ui/layout'
import { BsFillLightningFill, BsPlug } from 'react-icons/bs'
import { MenuItem } from './MenuItem'
import { PublicMenu } from './PublicMenu'
import { MakerMenu } from './MakerMenu'
import { TalentMenu } from './TalentMenu'

export const NavMenus = ({menuopen, viewer, loadingViewer, isLoggedIn, onclose}) => {
	// console.log('menus', menuopen)
	 
	return (
			<Stack spacing="1">
				<MakerMenu onclose={onclose} menuopen={menuopen} />
				<TalentMenu onclose={onclose} menuopen={menuopen} />
				{
					!isLoggedIn ? (
						<>
							<MenuItem 
								onclose={onclose}
								menuopen={menuopen}
								link="/maker/sign-in" 
								label="Opportunity Maker" 
								icon={BsPlug} 
							/>
							<MenuItem
								onclose={onclose}
								menuopen={menuopen} 
								link="/talent/sign-in" 
								label="Young Talent" 
								icon={BsPlug} 
							/>
						</>
					) : (
						<>
							<MenuItem 
								menuopen={menuopen} 
								link="/connect/platform" 
								label="Connect" 
								icon={BsFillLightningFill} 
								isActive 
								onclose={onclose}
							/>
							<MenuItem 
								menuopen={menuopen} 
								link="/connect/jobs" 
								label="Opportunity Board" 
								icon={BsFillLightningFill} 
								isActive 
								onclose={onclose}
							/>
						</>
					)
				}

				{menuopen && <Divider borderColor="black" />}

				<PublicMenu onclose={onclose} menuopen={menuopen} />

			</Stack>
	)
}
