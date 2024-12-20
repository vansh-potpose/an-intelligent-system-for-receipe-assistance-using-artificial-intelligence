// src/app/components/SpeechRecognition.tsx
'use client'; // This line marks the component as a client component

import { useEffect, useState } from 'react';

const SpeechRecognition = ({
    setInput
}) => {
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setError('Speech recognition not supported in this browser.');
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition(); // Cast to any to bypass TypeScript error
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
            const currentTranscript = Array.from(event.results).map(result => result[0].transcript).join('');
            setInput(currentTranscript);
        };

        recognition.onerror = (event: { error: string }) => {
            setError(event.error);
            console.log('Error occurred in recognition: ' + event.error);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    return (
            <button 
            style={isListening ? styles.buttonActive : styles.button} 
            className='rounded-full'
                onClick={() => setIsListening(!isListening)}
            >
                 <img
                src={isListening ? "mic_on.svg" : "mic_off.svg"} 
                alt={isListening ? 'Mic On' : 'Mic Off'}
                style={{ width: '24px', height: '24px' }} // Adjust size if needed
            />
            </button>
    );
};

// Inline styles with correct types
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column', // Correctly defined
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
    },
    button: {
        backgroundColor: '#0070f3',
        color: '#ffffff',
        border: 'none',
        // borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonActive: {
        backgroundColor: '#ff4c4c',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    transcript: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
        textAlign: 'center',
    },
    error: {
        marginTop: '10px',
        fontSize: '16px',
        color: 'red',
    },
};

export default SpeechRecognition;
