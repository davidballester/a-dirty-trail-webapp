import Head from 'next/head';
import GameView from '../components/GameView';
import { GameViewModeProvider } from '../contexts/gameViewModeContext';
import { NarrationProvider } from '../contexts/narrationContext';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <NarrationProvider>
            <GameViewModeProvider>
                <GameView />
            </GameViewModeProvider>
        </NarrationProvider>
    </>
);

export default Home;
