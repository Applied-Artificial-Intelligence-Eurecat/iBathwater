import React, {useContext} from "react";
import {Header} from "../components/Header";
import {ThingContext} from "../context/ThingContext";
import {ThingCard} from "../components/ThingCard";
import {CardDeck} from "react-bootstrap";
import "../static/styles/thing.css";

export const Thing = () => {
    const {things} = useContext(ThingContext);


    const thingsView = things ? things.map((thing, i) => {
        return (
          <ThingCard  key={thing.id} thing={ thing}/>
        )
    }): null;

    console.log(things)

  return (
      <>
          <Header title={'Explore our connected Water Devices'}/>
          <CardDeck className={'cardDeck'}>
              {thingsView}
          </CardDeck>
      </>
  );
};