import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getBackUrl } from "./controller/backUrl";

export default function CalendarComponent() {
  const [rendezVous, setRendezVous] = useState([]);
  const [date, setDate] = useState(new Date()); // Correction ici
  const backUrl = `${getBackUrl()}/rdv`;

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const response = await fetch(`${backUrl}/all/rdv`);
        const data = await response.json(); // Correction ici
        setRendezVous(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des RDV :", error);
      }
    };
    fetchRendezVous();
  }, []);

  // Fonction pour formater les dates des rendez-vous
  const getEventDates = () => {
    return rendezVous.map((rdv) => ({
      date: new Date(rdv.dateDuRendezVous), // Correction ici
      status: rdv.status.statusName, // Correction ici
    }));
  };

  // Applique les couleurs en fonction des statuts
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const eventDates = getEventDates();
      const rdv = eventDates.find(
        (rdv) => rdv.date.toDateString() === date.toDateString()
      );

      if (rdv) {
        return rdv.status === "EN_ATTENTE" ? "pending" : "accepted";
      }
    }
    return "";
  };

  // Désactive les weekends
  const tileDisabled = ({ date, view }) => {
    return view === "month" && (date.getDay() === 0 || date.getDay() === 6);
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        minDate={new Date()} // Empêche la sélection des dates passées
      />
    </div>
  );
}
