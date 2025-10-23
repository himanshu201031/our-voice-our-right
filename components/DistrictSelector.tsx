import React, { useState, useMemo } from 'react';
import { MOCK_STATE_DATA } from '../constants';
import { useLocalization } from '../App';
import { LocationIcon } from './icons';

interface Props {
  onDistrictSelect: (districtId: string | null) => void;
  selectedDistrictId: string | null;
}

const DistrictSelector: React.FC<Props> = ({ onDistrictSelect, selectedDistrictId }) => {
  const { t, language } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const allDistricts = useMemo(() =>
    MOCK_STATE_DATA.flatMap(state =>
      state.districts.map(district => ({
        ...district,
        stateName: language === 'hi' ? state.nameHi : state.name,
      }))
    ), [language]);

  const filteredDistricts = useMemo(() => {
    if (!searchTerm) return [];
    return allDistricts.filter(d =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.nameHi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allDistricts]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
            if (!response.ok) throw new Error('Failed to fetch location data.');
            
            const data = await response.json();
            // In India, district is often in the 'county' field from Nominatim
            const detectedDistrictName = data.address?.county || data.address?.state_district;

            if (detectedDistrictName) {
                // Clean up name, e.g., "Agra District" -> "agra"
                const cleanedName = detectedDistrictName.replace(/ district/i, '').trim().toLowerCase();
                
                const matchedDistrict = allDistricts.find(d => d.name.toLowerCase() === cleanedName);

                if (matchedDistrict) {
                    onDistrictSelect(matchedDistrict.id);
                    setSearchTerm(language === 'hi' ? matchedDistrict.nameHi : matchedDistrict.name);
                } else {
                    alert(`We detected you're in "${detectedDistrictName}", but we don't have data for it. Please search and select manually.`);
                }
            } else {
                alert('Could not determine your district. Please select it manually.');
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            alert('An error occurred while trying to determine your location.');
        } finally {
            setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        alert(t('geolocationError'));
        setIsDetecting(false);
      }
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">{t('selectDistrict')}</h2>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          {searchTerm && filteredDistricts.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredDistricts.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onDistrictSelect(d.id);
                      setSearchTerm(language === 'hi' ? d.nameHi : d.name);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {language === 'hi' ? d.nameHi : d.name} <span className="text-sm text-gray-500">({d.stateName})</span>
                  </div>
                ))}
            </div>
          )}
        </div>
        <button
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {isDetecting ? (
            <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                <span>Detecting...</span>
            </>
          ) : (
            <>
                <LocationIcon />
                {t('detectLocation')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DistrictSelector;