import { GameProvider } from '../contexts/gameContext';
import Head from 'next/head';
import Header from '../components/Header';
import GameView from '../components/GameView';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <Header />
        <GameProvider>
            <GameView />
        </GameProvider>
    </>
);

export default Home;
