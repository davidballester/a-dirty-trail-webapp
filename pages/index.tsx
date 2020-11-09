import Head from 'next/head';
import { css } from 'emotion';
import GameView from '../components/GameView';
import { NarrationProvider } from '../contexts/narrationContext';
import { NarrativeSceneEngineProvider } from '../contexts/narrativeSceneEngineContext';
import { CombatSceneEngineProvider } from '../contexts/combatSceneEngineContext';
import Footer from '../components/Footer';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <div
            className={css`
                position: relative;
                padding-bottom: 3rem;
            `}
        >
            <NarrationProvider>
                <NarrativeSceneEngineProvider>
                    <CombatSceneEngineProvider>
                        <GameView />
                    </CombatSceneEngineProvider>
                </NarrativeSceneEngineProvider>
            </NarrationProvider>
        </div>
        <Footer />
    </>
);

export default Home;
