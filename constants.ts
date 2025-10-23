import { StateData, DistrictData, MonthlyData } from './types';

const generateMonthlyData = (baseDistrict: number, baseState: number): MonthlyData[] => {
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsHi = ['जन', 'फ़र', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितं', 'अक्टू', 'नवं', 'दिसं'];
  const currentMonth = new Date().getMonth();
  const data: MonthlyData[] = [];

  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - 11 + i + 12) % 12;
    data.push({
      month: monthsEn[monthIndex],
      monthHi: monthsHi[monthIndex],
      districtValue: Math.floor(baseDistrict + (Math.random() - 0.4) * baseDistrict * 0.2),
      stateValue: Math.floor(baseState + (Math.random() - 0.5) * baseState * 0.1),
    });
  }
  return data;
};

export const MOCK_DISTRICT_DATA: { [key: string]: DistrictData } = {
  "up-agra": {
    id: "up-agra",
    name: "Agra",
    nameHi: "आगरा",
    state: "Uttar Pradesh",
    totalHouseholds: 85000,
    totalWorkers: 120000,
    totalFundsUsed: 5200,
    monthlyPerformance: generateMonthlyData(10000, 9500),
  },
  "up-lucknow": {
    id: "up-lucknow",
    name: "Lucknow",
    nameHi: "लखनऊ",
    state: "Uttar Pradesh",
    totalHouseholds: 95000,
    totalWorkers: 150000,
    totalFundsUsed: 6800,
    monthlyPerformance: generateMonthlyData(12500, 9500),
  },
  "mh-pune": {
    id: "mh-pune",
    name: "Pune",
    nameHi: "पुणे",
    state: "Maharashtra",
    totalHouseholds: 110000,
    totalWorkers: 180000,
    totalFundsUsed: 8500,
    monthlyPerformance: generateMonthlyData(15000, 14000),
  },
  "mh-mumbai": {
    id: "mh-mumbai",
    name: "Mumbai Suburban",
    nameHi: "मुंबई उपनगरीय",
    state: "Maharashtra",
    totalHouseholds: 70000,
    totalWorkers: 100000,
    totalFundsUsed: 4300,
    monthlyPerformance: generateMonthlyData(8300, 14000),
  },
  "rj-jaipur": {
    id: "rj-jaipur",
    name: "Jaipur",
    nameHi: "जयपुर",
    state: "Rajasthan",
    totalHouseholds: 130000,
    totalWorkers: 190000,
    totalFundsUsed: 9200,
    monthlyPerformance: generateMonthlyData(16000, 15500),
  },
  "br-patna": {
    id: "br-patna",
    name: "Patna",
    nameHi: "पटना",
    state: "Bihar",
    totalHouseholds: 105000,
    totalWorkers: 160000,
    totalFundsUsed: 7100,
    monthlyPerformance: generateMonthlyData(13500, 13000),
  },
  "ka-bengaluru": {
    id: "ka-bengaluru",
    name: "Bengaluru Urban",
    nameHi: "बेंगलुरु शहरी",
    state: "Karnataka",
    totalHouseholds: 65000,
    totalWorkers: 95000,
    totalFundsUsed: 4100,
    monthlyPerformance: generateMonthlyData(8000, 11000),
  },
  "tn-chennai": {
    id: "tn-chennai",
    name: "Chennai",
    nameHi: "चेन्नई",
    state: "Tamil Nadu",
    totalHouseholds: 75000,
    totalWorkers: 110000,
    totalFundsUsed: 5300,
    monthlyPerformance: generateMonthlyData(9000, 10000),
  },
  "wb-kolkata": {
    id: "wb-kolkata",
    name: "Kolkata",
    nameHi: "कोलकाता",
    state: "West Bengal",
    totalHouseholds: 88000,
    totalWorkers: 125000,
    totalFundsUsed: 6500,
    monthlyPerformance: generateMonthlyData(11000, 10500),
  },
};

export const MOCK_STATE_DATA: StateData[] = [
  {
    name: "Uttar Pradesh",
    nameHi: "उत्तर प्रदेश",
    districts: [
      { id: "up-agra", name: "Agra", nameHi: "आगरा" },
      { id: "up-lucknow", name: "Lucknow", nameHi: "लखनऊ" },
    ],
  },
  {
    name: "Maharashtra",
    nameHi: "महाराष्ट्र",
    districts: [
      { id: "mh-pune", name: "Pune", nameHi: "पुणे" },
      { id: "mh-mumbai", name: "Mumbai Suburban", nameHi: "मुंबई उपनगरीय" },
    ],
  },
  {
    name: "Rajasthan",
    nameHi: "राजस्थान",
    districts: [
      { id: "rj-jaipur", name: "Jaipur", nameHi: "जयपुर" },
    ],
  },
  {
    name: "Bihar",
    nameHi: "बिहार",
    districts: [
      { id: "br-patna", name: "Patna", nameHi: "पटना" },
    ],
  },
  {
    name: "Karnataka",
    nameHi: "कर्नाटक",
    districts: [
      { id: "ka-bengaluru", name: "Bengaluru Urban", nameHi: "बेंगलुरु शहरी" },
    ],
  },
  {
    name: "Tamil Nadu",
    nameHi: "तमिलनाडु",
    districts: [
      { id: "tn-chennai", name: "Chennai", nameHi: "चेन्नई" },
    ],
  },
  {
    name: "West Bengal",
    nameHi: "पश्चिम बंगाल",
    districts: [
      { id: "wb-kolkata", name: "Kolkata", nameHi: "कोलकाता" },
    ],
  },
];

export const translations = {
  en: {
    title: "Our Voice, Our Rights",
    subtitle: "MGNREGA Performance Dashboard",
    selectDistrict: "Select Your District",
    searchPlaceholder: "Search for a district...",
    detectLocation: "Detect My Location",
    lastUpdated: "Last updated on",
    heroHouseholds: "Households Benefited",
    heroWorkers: "Workers Employed",
    heroFunds: "Funds Utilized (in Lakhs)",
    heroHouseholdsTooltip: "This is the total number of families who have received work under this scheme in your district.",
    heroWorkersTooltip: "This shows how many individual people have been given jobs in your district.",
    heroFundsTooltip: "This is the total money spent on wages and materials for MGNREGA work in your district.",
    monthlyPerformance: "Monthly Performance (Workers)",
    district: "District",
    stateAverage: "State Average",
    insightsTitle: "Simplified Insights",
    generateSummary: "Generate Simple Summary",
    readAloud: "Read Aloud",
    generating: "Generating summary...",
    geolocationError: "Could not get location. Please select manually.",
    selectDistrictPrompt: "Please select a district to view data.",
    offlineModeTitle: "Offline Mode",
    offlineModeMessage: "You are viewing cached data. Information may be outdated.",
  },
  hi: {
    title: "हमारी आवाज, हमारे अधिकार",
    subtitle: "मनरेगा प्रदर्शन डैशबोर्ड",
    selectDistrict: "अपना जिला चुनें",
    searchPlaceholder: "जिले के लिए खोजें...",
    detectLocation: "मेरा स्थान पहचानें",
    lastUpdated: "अंतिम अपडेट",
    heroHouseholds: "लाभान्वित परिवार",
    heroWorkers: "कार्यरत श्रमिक",
    heroFunds: "उपयोग की गई धनराशि (लाख में)",
    heroHouseholdsTooltip: "यह आपके जिले में इस योजना के तहत काम पाने वाले परिवारों की कुल संख्या है।",
    heroWorkersTooltip: "यह दिखाता है कि आपके जिले में कितने लोगों को रोजगार दिया गया है।",
    heroFundsTooltip: "यह आपके जिले में मनरेगा के काम पर मजदूरी और सामग्री पर खर्च किया गया कुल पैसा है।",
    monthlyPerformance: "मासिक प्रदर्शन (श्रमिक)",
    district: "जिला",
    stateAverage: "राज्य औसत",
    insightsTitle: "सरल अंतर्दृष्टि",
    generateSummary: "सरल सारांश उत्पन्न करें",
    readAloud: "जोर से पढ़ें",
    generating: "सारांश बना रहा है...",
    geolocationError: "स्थान प्राप्त नहीं हो सका। कृपया मैन्युअल रूप से चयन करें।",
    selectDistrictPrompt: "डेटा देखने के लिए कृपया एक जिला चुनें।",
    offlineModeTitle: "ऑफलाइन मोड",
    offlineModeMessage: "आप कैश्ड डेटा देख रहे हैं। जानकारी पुरानी हो सकती है।",
  },
};