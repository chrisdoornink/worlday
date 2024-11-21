import World from "./components/worlday";
import { WindProvider } from "./components/worlday/context/WindContext";
import { ZoomProvider } from './context/ZoomContext';
import { ZoomControls } from './components/zoom/ZoomControls';

export default function Home() {
  return (
    <ZoomProvider>
      <main>
        <ZoomControls />
        <WindProvider><World /></WindProvider>
      </main>
    </ZoomProvider>
  );
}
