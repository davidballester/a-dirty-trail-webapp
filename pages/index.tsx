import Head from 'next/head';
import GameView from '../components/GameView';
import { NarrationProvider } from '../contexts/narrationContext';
import { NarrativeSceneEngineProvider } from '../contexts/narrativeSceneEngineContext';
import { CombatSceneEngineProvider } from '../contexts/combatSceneEngineContext';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <NarrationProvider>
            <NarrativeSceneEngineProvider>
                <CombatSceneEngineProvider>
                    <GameView />
                </CombatSceneEngineProvider>
            </NarrativeSceneEngineProvider>
        </NarrationProvider>
    </>
);

export default Home;
