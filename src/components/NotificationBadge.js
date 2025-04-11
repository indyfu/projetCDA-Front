import React, { useState, useEffect,useContext } from "react";
import { Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { myContext } from '../index';
import { getBackUrl } from "./controller/backUrl";

export default function NotificationBadge() {
  const [notifCount, setNotifCount] = useState(0);
  const [user] = useContext(myContext);
   const backUrl = `${getBackUrl()}/rdv`;

  const fetchNotifications = async () => {
    try {
        if (!user) {
            return;  // Si l'utilisateur n'est pas connecté, on ne charge pas les notifications
          }
      const response = await fetch(`${backUrl}/notification`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,  // Envoi du token JWT dans l'en-tête
          'Content-Type': 'application/json',
        }
      });
       
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notifications");
      }
      const data = await response.json();
      setNotifCount(data.count); // Met à jour le state avec le COUNT() récupéré
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 3600000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Badge pill bg="dark" className="position-relative">
      <FaBell size={25} color="white" />
      {notifCount > 0 && ( // Affiche seulement si notifCount > 0
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
          {notifCount}
        </span>
      )}
    </Badge>
  );
}
