import React, { useCallback, useMemo } from 'react';
import { MdKeyboardBackspace, MdKeyboardReturn } from 'react-icons/md';
import './keyboard.scss';

const keyboardLayout = [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    'Backspace Z X C V B N M Enter',
];
const mathKeyboardLayoutWithParentheses = [
    '0 1 2 3 4 5 6 7 8 9',
    'Backspace + - * / ( ) Enter'
];
const mathKeyboardLayout = [
    '0 1 2 3 4 5 6 7 8 9',
    'Backspace + - * / Enter'
];

const getKeyboardLayout = (gamemode: { name: string, includeParentheses?: boolean }) => {
    const { name, includeParentheses } = gamemode;
    switch (name) {
        case 'MATHLER':
            return includeParentheses ? mathKeyboardLayoutWithParentheses : mathKeyboardLayout;
        default:
            return keyboardLayout;
    }
};

const keyboardIcons = {
    Backspace: <MdKeyboardBackspace />,
    Enter: <MdKeyboardReturn />
};

type KeyboardProps = {
    gamemode: { name: string, includeParentheses?: boolean };
    guesses: Array<{ color: string, sign: string }>;
    onKeyPress: (key: string) => void;
}

const Keyboard = ({gamemode, guesses, onKeyPress}: KeyboardProps) => {
    const handleKeyPress = useCallback((key: string) => () => onKeyPress(key), [onKeyPress]);
    const keyboardLayout = useMemo(() => getKeyboardLayout(gamemode), [gamemode]);
    const keyRows = useMemo(() => {
        const colors: Record<string, string> = guesses.flat().reduce((acc: Record<string, string>, guessedLetter) => {
            if (acc[guessedLetter.sign] === 'g') return acc;
            if (acc[guessedLetter.sign] === 'y' && guessedLetter.color === 'x') return acc;
            return { ...acc, [guessedLetter.sign]: guessedLetter.color };
        }, {});
        const rows = keyboardLayout.reduce((acc: Array<JSX.Element>, row) => {
            const keys = row.split(' ').map((key) => {
                const keyDisplay = key.length > 1 ? keyboardIcons[key as keyof typeof keyboardIcons] : key
                return <div key={key} onClick={handleKeyPress(key)} className={`key-${key.toLowerCase()} ${colors[key.toLowerCase()]} key`}>{keyDisplay}</div>
            });
            acc.push(<div className="keyboard-row">{keys}</div>);
            return acc;
        }, []);
        return rows;
    }, [keyboardLayout, guesses, handleKeyPress]);
    return <div>{keyRows}</div>;
};

export default Keyboard;