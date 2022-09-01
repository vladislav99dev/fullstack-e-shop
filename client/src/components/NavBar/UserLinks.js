import { Link } from "react-router-dom";


import { useAuthContext } from "../../context/AuthContext"

const UserLinks = ({toggleDesktopUserMenu}) => {
    const {user} = useAuthContext();

    return(
        <>
        {!user.email
        ?<>
            <div className="container-links">
                <Link to={"users/login"} className="mobile-links" onClick={toggleDesktopUserMenu} >Login</Link>
            </div>
            <div className="container-links">
                <Link to={"users/register"} className="mobile-links" onClick={toggleDesktopUserMenu}>Register</Link>
            </div>
        </>
        :<>
            <div className="container-links">
                <Link to={"users/logout"} className="mobile-links" onClick={toggleDesktopUserMenu}>Logout</Link>
            </div>
            <div className="container-links">
                <Link to={"#"} className="mobile-links" onClick={toggleDesktopUserMenu}>Edit Profile</Link>
            </div>
        </>
        }
        </>
    )
}

export default UserLinks;

