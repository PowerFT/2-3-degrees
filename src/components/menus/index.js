import React from 'react'
import { Divider, Stack } from '@chakra-ui/layout'
import { BsFillLightningFill, BsPlug } from 'react-icons/bs'
import { MenuItem } from './MenuItem'
import { PublicMenu } from './PublicMenu'
import { MakerMenu } from './MakerMenu'
import { TalentMenu } from './TalentMenu'

export const NavMenus = ({menuopen, mobile, viewer, loadingViewer, isLoggedIn, onclose}) => {
	// console.log('menus', menuopen)
	 
	return (
			<Stack spacing="1">
				<MakerMenu mobile={mobile}  onclose={onclose} menuopen={menuopen} />
				<TalentMenu mobile={mobile}  onclose={onclose} menuopen={menuopen} />
				{
					!isLoggedIn ? (
						<>
							<MenuItem 
								onclose={onclose}
								menuopen={menuopen}
								link="/maker/sign-in" 
								label="Employer" 
								icon={BsPlug}
								mobile={mobile} 
							/>
							<MenuItem
								onclose={onclose}
								menuopen={menuopen} 
								link="/talent/sign-in" 
								label="Young Person" 
								icon={BsPlug} 
								mobile={mobile} 
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
								mobile={mobile} 
							/>
							<MenuItem 
								menuopen={menuopen} 
								link="/connect/jobs" 
								label="Opportunity Board" 
								icon={BsFillLightningFill} 
								isActive 
								onclose={onclose}
								mobile={mobile} 
							/>
						</>
					)
				}

				{menuopen && <Divider borderColor="black" />}

				<PublicMenu mobile={mobile}  onclose={onclose} menuopen={menuopen} />

			</Stack>
	)
}
