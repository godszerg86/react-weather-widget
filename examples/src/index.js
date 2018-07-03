import React from 'react';
import { render } from "react-dom";
import WeatherWidget from '../../src';

const App = () => (
  <WeatherWidget mapQuestApiKey={`7CQ0CoTaAzMbWIB3Z8pAi0RaIDsxA5sR`} darkSkyApiKey={`aacfe037ee008246c4a80952cf8877de`} localhost={true}/>
);
render(<App />, document.getElementById("root"));