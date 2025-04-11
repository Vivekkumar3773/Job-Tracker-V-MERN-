import React, { useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    const jobsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allJobs.length / jobsPerPage);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>

            {
                allJobs.length <= 0 ? (
                    <div className="mt-10 text-center text-lg">
                        <span>No Job Available</span>
                        <p className="text-sm text-gray-600">Please login to view jobs</p>
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6'>
                            {currentJobs.map((job) => (
                                <LatestJobCards key={job._id} job={job} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className='flex justify-center items-center gap-4 mt-8'>
                            <Button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                variant="outline"
                            >
                                Previous
                            </Button>
                            <span className='text-gray-700 font-medium'>
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                variant="outline"
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default LatestJobs;
