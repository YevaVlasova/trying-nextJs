import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
        .then((res) => res.json())
        .then((data) => setMakes(data.Results));
    }, []);

    const handleNext = () => {
        if (selectedMake && selectedYear) {
            router.push(`/result/${selectedMake}/${selectedYear}`);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="p-8 h-screen">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Filter Cars</h1>
                <div className="mb-4">
                    <label className="block mb-2">Vehicle makes:</label>
                    <select
                        className="border p-3 w-full rounded-md border-gray-900"
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                    >
                        <option value="">Vehicle makes</option>
                        {makes.map((make: any) => (
                            <option key={make.MakeId} value={make.MakeId}>
                                {make.MakeName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Model year:</label>
                    <select
                        className="border p-3 w-full rounded-md border-gray-900"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Model year</option>
                        {Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i).map(
                            (year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            )
                        )}
                    </select>
                </div>
                <button
                    className={`px-8 py-3 bg-gray-900 text-white rounded-md ${!selectedMake || !selectedYear ? 'opacity-40 cursor-not-allowed' : ''}`}
                    disabled={!selectedMake || !selectedYear}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </Suspense>
    );
};

export default Home;