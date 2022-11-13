import { Provider } from "react-redux";

import store from "../redux/store";

import App from "../jsx/App";


import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


import '../styles/global.css'
import '../styles/style.css'
import '../styles/utils.css'
import '../styles/mobile.css'
import "@fortawesome/fontawesome-svg-core/styles.css";


const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} />
    </Provider>
  )
}

export default MyApp
