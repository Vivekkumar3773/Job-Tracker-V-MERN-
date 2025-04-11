import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg shadow-lg bg-white border border-gray-100 flex flex-col justify-between h-full">
      {/* Top Row */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark size={16} />
        </Button>
      </div>

      {/* Company Logo and Name */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h2 className="font-medium text-base sm:text-lg">
            {job?.company?.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h1 className="font-semibold text-base sm:text-lg my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges Section - Fixes overflow */}
      <div className="flex flex-wrap gap-2 mt-4 text-xs sm:text-sm">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-[#F83002] font-semibold truncate max-w-[100px]"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] w-full sm:w-auto">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
