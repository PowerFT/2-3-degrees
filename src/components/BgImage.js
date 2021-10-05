import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'

export const BgImage = ({bgPatternCol}) => {

	console.log('bg renders', bgPatternCol)

		switch(bgPatternCol) {
			case 'orange':
				return (
					<StaticImage 
						src="../images/largePattern-orange2.png"
						alt="shape pattern"
						// height={400}
						fit="cover"
						imgStyle={{height:"100%", objectFit:"cover", objectPosition:"bottom"}}
						style={{
							height:"100%", 
							width:"100%", 
							position:"absolute", 
							insetX:"0",
							insetY:"0",
							w:"100%",
							h:"100%",
							zIndex:"auto",
							right:"0",
							left:"0",
							top:"0",
							bottom:"0"
						}}
					/>
				)
			case 'blue':
				return (
					<StaticImage 
						src="../images/largePattern-blue2.png"
						alt="shape pattern"
						// height={400}
						fit="cover"
						imgStyle={{height:"100%", objectFit:"cover", objectPosition:"bottom"}}
						style={{
							height:"100%", 
							width:"100%", 
							position:"absolute", 
							insetX:"0",
							insetY:"0",
							w:"100%",
							h:"100%",
							zIndex:"auto",
							right:"0",
							left:"0",
							top:"0",
							bottom:"0"
						}}
					/>
				)
			case 'yellow':
				return (
					<StaticImage 
						src="../images/largePattern-yellow2.png"
						alt="shape pattern"
						// height={400}
						fit="cover"
						imgStyle={{height:"100%", objectFit:"cover", objectPosition:"bottom"}}
						style={{
							height:"100%", 
							width:"100%", 
							position:"absolute", 
							insetX:"0",
							insetY:"0",
							w:"100%",
							h:"100%",
							zIndex:"auto",
							right:"0",
							left:"0",
							top:"0",
							bottom:"0"
						}}
					/>
				)
			case 'cream':
				return (
					<StaticImage
					placeholder="none"
						src="../images/largePattern-cream2.png"
						alt="shape pattern"
						// height={400}
						fit="cover"
						imgStyle={{height:"100%", objectFit:"cover", objectPosition:"bottom"}}
						style={{
							height:"100%", 
							width:"100%", 
							position:"absolute", 
							insetX:"0",
							insetY:"0",
							w:"100%",
							h:"100%",
							zIndex:"auto",
							right:"0",
							left:"0",
							top:"0",
							bottom:"0"
						}}
					/>
				)
			default:
				return null
		}
}
