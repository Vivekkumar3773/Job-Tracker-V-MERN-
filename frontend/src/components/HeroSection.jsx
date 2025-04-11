import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Search, Mic, MicOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const [listening, setListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setSpeechSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript);
            setListening(false);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
    }, []);


    const handleVoiceSearch = () => {
        if (!speechSupported || listening) return;

        setListening(true);
        recognitionRef.current?.start();
    };

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    // Typewriter Logic
    const words = ['Dream Jobs', 'Hiring Alerts', 'Top Companies', 'Career Boost', 'Job Offers'];
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let typingSpeed = isDeleting ? 50 : 120;

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setDisplayText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            } else {
                setDisplayText(currentWord.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            }

            if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex]);

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Job Tracking Website
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br />
                    Get Your{' '}
                    <span className='text-[#6A38C2]'>
                        {displayText}
                        <span className='border-r-2 border-[#6A38C2] animate-blink ml-1' />
                    </span>
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </p>
                <div className='flex w-[90%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-3 mx-auto'>
                    <input
                        type='text'
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    {speechSupported && (
                        <Button
                            onClick={handleVoiceSearch}
                            variant='ghost'
                            className='p-2'
                            disabled={listening}
                        >
                            {listening ? <MicOff className='h-5 w-5 text-red-500 animate-pulse' /> : <Mic className='h-5 w-5 text-[#6A38C2]' />}
                        </Button>
                    )}
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2] text-white'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
                {!speechSupported && (
                    <p className='text-sm text-gray-500 mt-2'>🎤 Voice search not supported in this browser.</p>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
