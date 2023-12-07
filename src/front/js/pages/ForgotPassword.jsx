import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ForgotPassword = () => {
    const [messageStatus, setMessageStatus] = useState("not sent")
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")

    const handleResetRequest = async () => { 
        let result = await actions.requestResetLink(email)
        if (result == true){
            setMessageStatus("sent")
        }
    }

    switch (messageStatus) {
        case "not sent":
            return(
                <div className="text-center">
                    <div className="card mx-auto mt-2" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Forgot Your Password</h5>
                            <p className="card-text">Please input your email</p>
                            <input type="email" placeholder="type your email" onChange={(e)=> setEmail(e.target.value)}/>
                            <div className="m-2">
                                <button className="btn btn-primary" onClick={() => handleResetRequest()}>Request reset link</button>
                            </div>
                            <Link to="/login">
                                <a href="#">Go back to login</a>
                            </Link>
            
                        </div>
                    </div>
                </div>
            )
        case "sent":
            return(
                <div className="text-center">
                    <div className="card mx-auto mt-2" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Success</h5>
                            <p className="card-text">A password reset link has been sent to the email address provided</p>
                            <Link to="/login">
                                <a href="#">Go back to login</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )
    }
}

export default ForgotPassword;