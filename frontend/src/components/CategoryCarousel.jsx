import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Data Science',
    'Graphic Designer',
    'MERN Stack',
    'Internship',
    'FullStack Developer',
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    );

    const searchJobHandler = useCallback(
        (query) => {
            dispatch(setSearchedQuery(query));
            navigate('/browse');
        },
        [dispatch, navigate]
    );

    return (
        <div className="w-full max-w-4xl mx-auto my-20 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Explore Job Categories</h2>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: '0px 8px 20px rgba(0,0,0,0.1)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full w-full py-6 text-sm font-semibold"
                                >
                                    {cat}
                                </Button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
