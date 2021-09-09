import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { BsFillLightningFill } from 'react-icons/bs'

import { MenuItem } from './MenuItem'

export const PublicMenu = ({ menuopen, onclose }) => {
	return (
		<StaticQuery
			query={MENU_QUERY}
			render={data => {
				if (data.wpMenu.menuItems) {
					const menuItems = data.wpMenu.menuItems.nodes

					return (
						<>
							{
								menuItems &&
								menuItems.map((item) => (
									<MenuItem key={item.id} link={item.url} label={item.label} icon={BsFillLightningFill} menuopen={menuopen} onclose={onclose} />
								))
							}
						</>
					)
				}
			}}
		/>
	)
}

const MENU_QUERY = graphql`
	query MenuQuery {
		wpMenu(locations: {eq: PRIMARY}) {
			id
			name
			menuItems {
				nodes {
					label
					url
					id
				}
			}
		}
	}
`
