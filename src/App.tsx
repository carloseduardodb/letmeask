import Routes from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
