import React, { Fragment, useEffect, useState } from 'react'

import Calendario from './calendario'
//import events from './resources/events'
import { fetchLatestTurnos } from '../lib/data';

export default async function Turnos() {
  const eventos = await fetchLatestTurnos();
   
    return (
        <Fragment>
          <div className="height600" style={{ height: '600px', position: 'relative' }}>
            <Calendario events={eventos}   />
          </div>
        </Fragment>
      );
  };
