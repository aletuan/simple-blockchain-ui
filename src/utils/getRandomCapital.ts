const capitals = [
    'Kabul', 'Tirana', 'Algiers', 'Andorra la Vella', 'Luanda', 'Buenos Aires', 'Yerevan', 'Canberra', 'Vienna',
    'Baku', 'Nassau', 'Manama', 'Dhaka', 'Bridgetown', 'Minsk', 'Brussels', 'Belmopan', 'Porto-Novo', 'Thimphu',
    'La Paz', 'Sarajevo', 'Gaborone', 'Brasília', 'Sofia', 'Ouagadougou', 'Gitega', 'Praia', 'Phnom Penh', 'Yaoundé',
    'Ottawa', 'Bangui', 'N\'Djamena', 'Santiago', 'Beijing', 'Bogotá', 'Moroni', 'Kinshasa', 'Brazzaville', 'San José',
    'Zagreb', 'Havana', 'Nicosia', 'Prague', 'Copenhagen', 'Djibouti', 'Roseau', 'Santo Domingo', 'Quito', 'Cairo',
    'San Salvador', 'Malabo', 'Asmara', 'Tallinn', 'Mbabane', 'Addis Ababa', 'Suva', 'Helsinki', 'Paris', 'Libreville',
    'Banjul', 'Tbilisi', 'Berlin', 'Accra', 'Athens', 'Saint George\'s', 'Guatemala City', 'Conakry', 'Bissau', 'Georgetown',
    'Port-au-Prince', 'Tegucigalpa', 'Budapest', 'Reykjavik', 'New Delhi', 'Jakarta', 'Tehran', 'Baghdad', 'Dublin',
    'Jerusalem', 'Rome', 'Kingston', 'Tokyo', 'Amman', 'Nur-Sultan', 'Nairobi', 'Tarawa', 'Pyongyang', 'Seoul', 'Pristina',
    'Kuwait City', 'Bishkek', 'Vientiane', 'Riga', 'Beirut', 'Maseru', 'Monrovia', 'Tripoli', 'Vaduz', 'Vilnius', 'Luxembourg',
    'Antananarivo', 'Lilongwe', 'Kuala Lumpur', 'Malé', 'Bamako', 'Valletta', 'Majuro', 'Nouakchott', 'Port Louis', 'Mexico City',
    'Palikir', 'Chisinau', 'Monaco', 'Ulaanbaatar', 'Podgorica', 'Rabat', 'Maputo', 'Naypyidaw', 'Windhoek', 'Yaren', 'Kathmandu',
    'Amsterdam', 'Wellington', 'Managua', 'Niamey', 'Abuja', 'Skopje', 'Oslo', 'Muscat', 'Islamabad', 'Ngerulmud', 'Panama City',
    'Port Moresby', 'Asunción', 'Lima', 'Manila', 'Warsaw', 'Lisbon', 'Doha', 'Bucharest', 'Moscow', 'Kigali', 'Basseterre',
    'Castries', 'Kingstown', 'Apia', 'San Marino', 'São Tomé', 'Riyadh', 'Dakar', 'Belgrade', 'Victoria', 'Freetown', 'Singapore',
    'Bratislava', 'Ljubljana', 'Honiara', 'Mogadishu', 'Pretoria', 'Juba', 'Madrid', 'Colombo', 'Khartoum', 'Paramaribo', 'Stockholm',
    'Bern', 'Damascus', 'Taipei', 'Dushanbe', 'Dodoma', 'Bangkok', 'Lomé', 'Nukuʻalofa', 'Port of Spain', 'Tunis', 'Ankara', 'Ashgabat',
    'Funafuti', 'Kampala', 'Kyiv', 'Abu Dhabi', 'London', 'Washington, D.C.', 'Montevideo', 'Tashkent', 'Port Vila', 'Vatican City',
    'Caracas', 'Hanoi', 'Sana\'a', 'Lusaka', 'Harare'
  ];
  
  export const getRandomCapital = (): string => {
    const randomIndex = Math.floor(Math.random() * capitals.length);
    return capitals[randomIndex];
  };