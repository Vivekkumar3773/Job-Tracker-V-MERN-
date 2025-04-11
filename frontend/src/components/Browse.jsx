import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery({}));
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div>
            <Navbar />
            <motion.div
                className='max-w-7xl mx-auto my-10'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className='font-bold text-xl my-10 text-gray-800'>
                    Search Results ({allJobs.length})
                </h1>

                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {
                        allJobs.map((job) => (
                            <motion.div key={job._id} variants={itemVariants}>
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Browse;
