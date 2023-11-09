import NavLinks from "./navlinks"
export default function Asidebar() {
    return (
        <>
            <aside>
                <div className="menu">
                    <ul>
                        <NavLinks />
                    </ul>
                </div>
            </aside>
        </>
    )
}