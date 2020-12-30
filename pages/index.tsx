import Head from 'next/head';
import { css } from 'emotion';
import GameView from '../components/GameView';
import { NarrationProvider } from '../contexts/narrationContext';
import { NarrativeSceneEngineProvider } from '../contexts/narrativeSceneEngineContext';
import { CombatSceneEngineProvider } from '../contexts/combatSceneEngineContext';
import Footer from '../components/Footer';
import SaveGameOnSceneChange from '../components/SaveGameOnSceneChange';
import SaveGameNotice from '../components/SaveGameNotice';

const Home = (): React.ReactElement => (
    <NarrationProvider>
        <NarrativeSceneEngineProvider>
            <CombatSceneEngineProvider>
                <SaveGameOnSceneChange>
                    <Head>
                        <title>A dirty trail</title>
                    </Head>
                    <div
                        className={css`
                            position: relative;
                            padding-bottom: 3rem;
                        `}
                    >
                        <SaveGameNotice />
                        <GameView />
                    </div>
                    <Footer />
                </SaveGameOnSceneChange>
            </CombatSceneEngineProvider>
        </NarrativeSceneEngineProvider>
    </NarrationProvider>
);

export default Home;
