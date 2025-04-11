import React, { useState } from "react";
import { getBackUrl } from "./backUrl";
import InscriptionView from "../view/InscriptionView";

export default function InscriptionController() {
    const backUrl = `${getBackUrl()}/security`;

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    function register(userData) {
        const userToRegister = { ...userData, roleName: "USER" };

        fetch(`${backUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userToRegister),
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Erreur lors de l'inscription");
        })
        .then(() => {
            setSuccessMessage("Inscription réussie ! Vous pouvez vous connecter.");
            setErrorMessage(null);
        })
        .catch(error => {
            setErrorMessage(error.message);
            setSuccessMessage(null);
        });
    }

    return (
        <InscriptionView 
        register={register} 
        errorMessage={errorMessage} 
        successMessage={successMessage} />
    );
}

