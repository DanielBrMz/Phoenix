import { type AppType } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import "../styles/navbar.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default api.withTRPC(MyApp);
