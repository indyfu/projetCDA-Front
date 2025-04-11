import React, { useState, useEffect, useContext } from "react";
import { myContext } from "../../index";
import { getBackUrl } from "./backUrl";
import SpaceView from "../view/SpaceView";

export default function SpaceController() {

    const backUrl = `${getBackUrl()}/space`;
    const [user] = useContext(myContext);
    const [infoUser, setInfoUser] = useState({});
    const [infoRdv, setInfoRdv] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    {/*useEffect(() => fetchRdvInfo(),[]);
    useEffect(() => fetchInfoUser(), []); */}
    useEffect(() => {
        if (user) {
          fetchInfoUser();
          fetchRdvInfo();
        }
      }, [user]);
      
    const fetchInfoUser = () => {
        const requestOptions = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${user.token}`
            }
        }
        console.log(requestOptions);
        console.log(`${backUrl}/${user.id}/infos`);

        fetch(`${backUrl}/${user.id}/infos`, requestOptions)
            .then(response => response.json())
            .then(json => 
              setInfoUser(json)
            )
            .catch(() => {
                setErrorMessage("Erreur lors de la récupération des infos utilisateur.");
              });
          };

    const fetchRdvInfo = () => {
        const requestOption = {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${user.token}`
            }
        }
        fetch(`${backUrl}/${user.id}/mes/rdv`, requestOption)
        .then(response => response.json())
        .then(json => {
            const formattedRdvs = json.map(rdv => ({
              id: rdv.id,
              dateDuRendezVous: rdv.dateDuRendezVous,
              robe: rdv.dress.name,
              image: rdv.dress.image
            }));
            setInfoRdv(formattedRdvs);
    })  .catch(() => {
        setErrorMessage("Erreur lors de la récupération des rendez-vous.");
      });
  };

    const modifyInfoUser = (newUserData) => {
        const dataToSend = {id: user.id, ...newUserData  };
        console.log("Données envoyées pour modification :", dataToSend);
 
        fetch(`${backUrl}/${user.id}/user/infos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => {
            if (response.ok) {
                return response.json();  // Parse la réponse en JSON
            } else {
                throw new Error("Erreur lors du changement des infos utilisateur");
            }
        })
        .then(() => {
            fetchInfoUser();
            setSuccessMessage("Vos informations ont été changées avec succès !");
            setErrorMessage(null);
        })
        .catch(error =>{
            setErrorMessage(error.message);
            setSuccessMessage(null);
        });
    }
    const  modifyRdvInfo = () => {
        const rdvToChange = {
            
        }
        fetch(`${backUrl}/${user.id}/user/rdv`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(rdvToChange),
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Erreur lors du changement des informations de votre rendez-vous");
        })
        .then(() => {
            fetchRdvInfo();
            setSuccessMessage("Demande de changement de rendez-vous effectuée.");
            setErrorMessage(null);
        })
        .catch(error => {
            setErrorMessage(error.message);
            setSuccessMessage(null);
        });
    }
    return(
        <SpaceView 
        infoUser ={infoUser}
        infoRdv = {infoRdv}
        modifyInfoUser = {modifyInfoUser}
        modifyRdvInfo = {modifyRdvInfo}
        errorMessage = {errorMessage}
        successMessage = {successMessage}/>
    )
}