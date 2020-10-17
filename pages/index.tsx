import { GameProvider } from '../contexts/gameContext';
import Head from 'next/head';
import GameView from '../components/GameView';
import { GameViewModeProvider } from '../contexts/gameViewModeContext';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <GameProvider>
            <GameViewModeProvider>
                <GameView />
            </GameViewModeProvider>
        </GameProvider>
    </>
);

export default Home;
