import React, { useCallback, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';
import localHistory from '../../localHistory';
import './home.scss';

const gamemodes = [
    'WORDLE',
    'MATHLER',
    'QUORDLE',
    'DORDLE',
    'XORDLE'
];

type HomeProps = {
    actions: {
        joinGame: (gameCode: string) => void;
    }
}

const Home = ({ actions }: HomeProps) => {
    const [hiddenImages, setHiddenImages] = useState<Record<string, boolean>>({});
    const [gameCode, setGameCode] = useState('');
    const handleGameCodeChange = useCallback(({ target }: { target: HTMLInputElement }) => {
        setGameCode(target.value);
    }, []);
    const handleBrokenImage = useCallback((gamemode: string) => () => {
        setHiddenImages((hiddenImages) => ({ ...hiddenImages, [gamemode]: true }));
    }, []);
    const joinGame = useCallback(() => {
        actions.joinGame(gameCode);
    }, [gameCode, actions]);
    const startNewGame = useCallback((gamemode: string) => () => {
        localHistory.push(`/${gamemode.toLowerCase()}`);
    }, []);
    const gamemodeViews = gamemodes.map((gamemode) => {
        return (<div key={gamemode} onClick={startNewGame(gamemode)} className={`${gamemode} gamemode`}>
            {
            !hiddenImages[gamemode]
                ? <img src={`/assets/${gamemode}`} onError={handleBrokenImage(gamemode)} alt={gamemode} />
                : gamemode
            }
        </div>)
    });

    return (
        <div className="home">
            Choose a gamemode to create or join a room:
            <div className="gamemodes">
                {gamemodeViews}
            </div>
            or join a room with a code:
            <input placeholder="Enter your room code" value={gameCode} onChange={handleGameCodeChange} />
            <button type="button" onClick={joinGame}>Join game</button>
            <Adsense
            client="ca-pub-6590154931831231"
            slot="8360483357"
            style={{ height: '20vh' }}
            format=""
            />
        </div>
    )
};

export default Home;