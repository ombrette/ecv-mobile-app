'use strict';

import React from "react";
import Config from 'react-native-config';
import { StatusBar } from "react-native";
import Navigator from "./src/navigation";
StatusBar.setHidden(true);

const App = () => <Navigator />;
export default App;