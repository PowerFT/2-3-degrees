import React from 'react'
import { Divider, Stack } from '@chakra-ui/layout'
import { BsFillLightningFill, BsPlug } from 'react-icons/bs'
import { MenuItem } from './MenuItem'
import { PublicMenu } from './PublicMenu'
import { MakerMenu } from './MakerMenu'
import { TalentMenu } from './TalentMenu'

export const NavMenus = ({menuopen, mobile, isloggedin, onclose}) => {
	console.log("loggedin: ", isloggedin,typeof isloggedin)

	const loggedin=isloggedin.toString()
	 
	return (
			<Stack spacing="1">
				{
					loggedin === "false" ? (
						<>
							<MenuItem 
								onclose={onclose}
								menuopen={menuopen}
								link="/maker/sign-in" 
								label="Employer Login" 
								icon={BsPlug}
								mobile={mobile} 
							/>
							<MenuItem
								onclose={onclose}
								menuopen={menuopen} 
								link="/talent/sign-in" 
								label="Young Person Login" 
								icon={BsPlug} 
								mobile={mobile} 
							/>
						</>
					) : (
						<>
							<MenuItem 
								menuopen={menuopen} 
								link="/connect/platform" 
								label="Connect Platform" 
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
				<MakerMenu mobile={mobile}  onclose={onclose} menuopen={menuopen} />
				<TalentMenu mobile={mobile}  onclose={onclose} menuopen={menuopen} />

				{menuopen && <Divider borderColor="dOrange.100" />}

				<PublicMenu mobile={mobile}  onclose={onclose} menuopen={menuopen} />

			</Stack>
	)
}
