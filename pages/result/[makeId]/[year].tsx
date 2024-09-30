import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ResultPage = () => {

  const router = useRouter();
  const { makeId, year } = router.query;
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (makeId && year) {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
        .then((res) => res.json())
        .then((data) => setModels(data.Results));
    }
  }, [makeId, year]);

  return (
      <div className="p-8 h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Available Models for {year}</h1>
        {models.length > 0 ? (
          <ul>
            {models.map((model: any) => (
              <li key={model.Model_ID} className="mb-4">
                {model.Model_Name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No models available for this make and year.</p>
        )}
      </div>
  );

};

export default ResultPage;