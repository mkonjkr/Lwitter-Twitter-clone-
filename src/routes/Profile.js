import { authService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        //go back to Main page after sign out
        history.push("/");
    }
    return (
        <>
        <button onClick = { onLogOutClick }>Log Out</button>
        </>
    );
};