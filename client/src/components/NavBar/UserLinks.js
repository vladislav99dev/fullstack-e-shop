import { Link } from "react-router-dom";

const UserLinks = ({
    clickHandler,
    user
}) => {

    return(
        <>
            {!user.email
            ?<>
                <div className="container-links">
                    <Link to={"users/login"} className="mobile-links" onClick={clickHandler} >Login</Link>
                </div>
                <div className="container-links border-0">
                    <Link to={"users/register"} className="mobile-links " onClick={clickHandler}>Register</Link>
                </div>
            </>
            :<>
                <div className="container-links">
                    <Link to={"users/logout"} className="mobile-links" onClick={clickHandler}>Logout</Link>
                </div>
                <div className="container-links border-0">
                    <Link to={"#"} className="mobile-links" onClick={clickHandler}>Edit Profile</Link>
                </div>
            </>
            }
        </>
    )
}

export default UserLinks;

