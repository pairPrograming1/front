import { Auth0Provider } from "@auth0/auth0-react";
import "../app/global.css";

function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      redirectUri={typeof window !== "undefined" && window.location.origin}
    >
      <div>
        <Component {...pageProps} />
      </div>
    </Auth0Provider>
  );
}

export default App;
