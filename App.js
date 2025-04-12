import ColorPalette from './components/ColorPalette';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <ColorPalette />
      </Container>
    </>
  );
}

export default App;
