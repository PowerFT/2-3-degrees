import { Badge, LightMode } from '@chakra-ui/react'
import * as React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

export const links = [
  {
    title: 'Organisation',
    links: [
      // {
      //   label: 'Why Envelope',
      //   href: '#',
      // },
      {
        label: 'Our story',
        href: '/about',
      },
      // {
      //   label: 'Careers',
      //   href: '#',
      //   badge: (
      //     <LightMode>
      //       <Badge colorScheme="blue" fontSize="0.625rem">
      //         Hiring
      //       </Badge>
      //     </LightMode>
      //   ),
      // },
      // {
      //   label: 'Press',
      //   href: '#',
      // },
      // {
      //   label: 'FAQ',
      //   href: '#',
      // },
    ],
  },
  {
    title: 'Services',
    links: [
      {
        label: 'Programmes',
        href: '/services',
      },
      {
        label: 'Consultancy',
        href: '/services',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'Blog',
        href: '/blog',
      },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        label: 'Contact Info',
        href: '/contact',
      },
      {
        label: 'Young Person Login',
        href: '/talent/sign-in',
      },
      {
        label: 'Employer Login',
        href: '/maker/sign-in',
      },
    ],
  },
]
export const socialLinks = [
  {
    label: 'Facebook',
    icon: <FaFacebook />,
    href: "https://www.facebook.com/2.3degrees/",
  },
  {
    label: 'Instagram',
    icon: <FaInstagram />,
    href: "https://www.instagram.com/2_3degrees/",
  },
  {
    label: 'Youtube',
    icon: <FaYoutube />,
    href: "https://www.youtube.com/channel/UC9nxulVkNqGn3XV5UxSEvNQ",
  },
  {
    label: 'Twitter',
    icon: <FaTwitter />,
    href: "https://twitter.com/2_3degrees?lang=en",
  },
]
export const footerLinks = [
  {
    label: 'Terms of Service',
    href: '/terms',
  },
  {
    label: 'Privacy Policy',
    href: '/privacy',
  },
]
