import ErrorMessage from "../../errorMessage/ErrorMessage";

import { NavLink, useNavigate } from "react-router-dom";

import './404.scss'

const Page404 = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1)

    return (
        <div className="error404">
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <NavLink className='main-page__link' to="/">
                Back to main page
            </NavLink>

            <div onClick={goBack} className="back__link" style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', marginTop: 10}}>Go back</div>
        </div>
    )
}

export default Page404;