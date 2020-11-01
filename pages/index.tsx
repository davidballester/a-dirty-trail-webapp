import Head from 'next/head';
import GameView from '../components/GameView';
import { GameViewModeProvider } from '../contexts/gameViewModeContext';
import { NarrationProvider } from '../contexts/narrationContext';
import { SceneProvider } from '../contexts/sceneContext';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <NarrationProvider>
            <SceneProvider>
                <GameViewModeProvider>
                    <GameView />
                </GameViewModeProvider>
            </SceneProvider>
        </NarrationProvider>
    </>
);

export default Home;
