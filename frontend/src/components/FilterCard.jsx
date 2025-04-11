import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [salaryLPA, setSalaryLPA] = useState(10); // default 10 LPA

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedValue) {
            dispatch(setSearchedQuery(selectedValue));
        }
    }, [selectedValue]);

    useEffect(() => {
        dispatch(setSearchedQuery(`${salaryLPA}LPA`));
    }, [salaryLPA]);

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    return (
        <div className='w-full bg-white p-4 rounded-md shadow-md'>
            <h1 className='font-bold text-xl mb-4'>Filter Jobs</h1>
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='mb-4'>
                            <h2 className='font-semibold text-base mb-2'>{data.filterType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-1'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }

                {/* LPA Slider for Salary */}
                <div className='mb-4'>
                    <h2 className='font-semibold text-base mb-2'>Salary Range (in LPA)</h2>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={salaryLPA}
                            onChange={(e) => setSalaryLPA(e.target.value)}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>₹1 LPA</span>
                            <span className='font-semibold text-black'>{salaryLPA} LPA</span>
                            <span>₹50 LPA</span>
                        </div>
                    </div>
                </div>
            </RadioGroup>
        </div>
    )
}

export default FilterCard;
