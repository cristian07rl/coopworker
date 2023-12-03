'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSackDollar, faAddressCard, faUsers } from '@fortawesome/free-solid-svg-icons'
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const house = <FontAwesomeIcon icon={faHouse} />
const links = [
    { name: 'Home', href: '/home', icon: <FontAwesomeIcon icon={faHouse} /> },
    {
        name: 'Afiliados',
        href: '/home/afiliados',
        icon: <FontAwesomeIcon icon={faUsers} />
    },
    {
        name: 'Customers',
        href: '/dashboard/customers',
        icon: <FontAwesomeIcon icon={faSackDollar} />
    },
    {
        name: 'Registro',
        href: '/home/registro',
        icon: <FontAwesomeIcon icon={faAddressCard} />
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    pathname == link.href ?
                        <Link key={link.name} href={link.href} style={{backgroundColor: '#212121'}}>
                            {LinkIcon} {link.name}
                        </Link>
                        :
                        <Link key={link.name} href={link.href}>
                            {LinkIcon} {link.name}
                        </Link >

                );
            })}
        </>
    );
}