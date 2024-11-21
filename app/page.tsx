import World from "./components/worlday";
import { WindProvider } from "./components/worlday/context/WindContext";

export default function Home() {
  return <WindProvider><World /></WindProvider>;
}
