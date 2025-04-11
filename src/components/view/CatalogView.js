import React from "react";
import { Container } from "react-bootstrap";
import DressCard from "../DressCard";

export default function CatalogView({ dresses, askForRdv }) {
    return (
        <Container className="catalog-view-container">
            <h2 className="text-center my-4">Catalogue de Robes</h2>
            {dresses.length > 0 ? (
                dresses.map((dress) => (
                    <div key={dress.id}>
                        <DressCard dress={dress} askForRdv={askForRdv} />
                    </div>
                ))
            ) : (
                <p>Aucune robe disponible dans le catalogue pour le moment.</p>
            )}
        </Container>
    );
}