import { Country } from 'country-state-city';

/**
 * Get country flag emoji by country code using Regional Indicator Symbols
 */
export function getCountryFlag(countryCode: string): string {
  try {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    
    // Convert country code to flag emoji using Regional Indicator Symbols
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    return String.fromCodePoint(...codePoints);
  } catch {
    return '🌍'; // Default fallback flag
  }
}

/**
 * Get country flag by country name (fallback method)
 */
export function getCountryFlagByName(countryName: string): string {
  try {
    const countries = Country.getAllCountries();
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country?.flag || '🌍';
  } catch {
    return '🌍'; // Default fallback flag
  }
}

/**
 * Popular country flags mapping for common countries (backup)
 */
export const COUNTRY_FLAGS: { [key: string]: string } = {
  // Popular countries
  'United States': '🇺🇸',
  'India': '🇮🇳',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Japan': '🇯🇵',
  'China': '🇨🇳',
  'Brazil': '🇧🇷',
  'Russia': '🇷🇺',
  'Mexico': '🇲🇽',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Netherlands': '🇳🇱',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Poland': '🇵🇱',
  'Turkey': '🇹🇷',
  'South Korea': '🇰🇷',
  'Thailand': '🇹🇭',
  'Singapore': '🇸🇬',
  'Philippines': '🇵🇭',
  'Malaysia': '🇲🇾',
  'Indonesia': '🇮🇩',
  'Vietnam': '🇻🇳',
  'Pakistan': '🇵🇰',
  'Bangladesh': '🇧🇩',
  'Sri Lanka': '🇱🇰',
  'Nepal': '🇳🇵',
  'South Africa': '🇿🇦',
  'Egypt': '🇪🇬',
  'Nigeria': '🇳🇬',
  'Kenya': '🇰🇪',
  'Argentina': '🇦🇷',
  'Chile': '🇨🇱',
  'Colombia': '🇨🇴',
  'Peru': '🇵🇪',
  'Venezuela': '🇻🇪',
  'UAE': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  'Israel': '🇮🇱',
  'Iran': '🇮🇷',
  'Iraq': '🇮🇶',
  'Afghanistan': '🇦🇫',
  
  // Caribbean and smaller countries
  'Anguilla': '🇦🇮',
  'Antigua and Barbuda': '🇦🇬',
  'Bahamas': '🇧🇸',
  'Barbados': '🇧🇧',
  'Belize': '🇧🇿',
  'Bermuda': '🇧🇲',
  'British Virgin Islands': '🇻🇬',
  'Cayman Islands': '🇰🇾',
  'Cuba': '🇨🇺',
  'Dominica': '🇩🇲',
  'Dominican Republic': '🇩🇴',
  'Grenada': '🇬🇩',
  'Guadeloupe': '🇬🇵',
  'Haiti': '🇭🇹',
  'Jamaica': '🇯🇲',
  'Martinique': '🇲🇶',
  'Montserrat': '🇲🇸',
  'Puerto Rico': '🇵🇷',
  'Saint Kitts and Nevis': '🇰🇳',
  'Saint Lucia': '🇱🇨',
  'Saint Vincent and the Grenadines': '🇻🇨',
  'Trinidad and Tobago': '🇹🇹',
  'Turks and Caicos Islands': '🇹🇨',
  'US Virgin Islands': '🇻🇮',
  
  // More countries
  'Albania': '🇦🇱',
  'Algeria': '🇩🇿',
  'Andorra': '🇦🇩',
  'Angola': '🇦🇴',
  'Antarctica': '🇦🇶',
  'Armenia': '🇦🇲',
  'Austria': '🇦🇹',
  'Azerbaijan': '🇦🇿',
  'Bahrain': '🇧🇭',
  'Belarus': '🇧🇾',
  'Belgium': '🇧🇪',
  'Bhutan': '🇧🇹',
  'Bolivia': '🇧🇴',
  'Bosnia and Herzegovina': '🇧🇦',
  'Botswana': '🇧🇼',
  'Bulgaria': '🇧🇬',
  'Cambodia': '🇰🇭',
  'Cameroon': '🇨🇲',
  'Chad': '🇹🇩',
  'Croatia': '🇭🇷',
  'Cyprus': '🇨🇾',
  'Czech Republic': '🇨🇿',
  'Estonia': '🇪🇪',
  'Ethiopia': '🇪🇹',
  'Fiji': '🇫🇯',
  'Georgia': '🇬🇪',
  'Ghana': '🇬🇭',
  'Greece': '🇬🇷',
  'Greenland': '🇬🇱',
  'Guatemala': '🇬🇹',
  'Honduras': '🇭🇳',
  'Hong Kong': '🇭🇰',
  'Hungary': '🇭🇺',
  'Iceland': '🇮🇸',
  'Ireland': '🇮🇪',
  'Jordan': '🇯🇴',
  'Kazakhstan': '🇰🇿',
  'Kuwait': '🇰🇼',
  'Latvia': '🇱🇻',
  'Lebanon': '🇱🇧',
  'Lithuania': '🇱🇹',
  'Luxembourg': '🇱🇺',
  'Macao': '🇲🇴',
  'Malta': '🇲🇹',
  'Moldova': '🇲🇩',
  'Monaco': '🇲🇨',
  'Mongolia': '🇲🇳',
  'Montenegro': '🇲🇪',
  'Morocco': '🇲🇦',
  'Myanmar': '🇲🇲',
  'Namibia': '🇳🇦',
  'New Zealand': '🇳🇿',
  'Nicaragua': '🇳🇮',
  'North Korea': '🇰🇵',
  'Oman': '🇴🇲',
  'Panama': '🇵🇦',
  'Paraguay': '🇵🇾',
  'Portugal': '🇵🇹',
  'Qatar': '🇶🇦',
  'Romania': '🇷🇴',
  'Rwanda': '🇷🇼',
  'Serbia': '🇷🇸',
  'Slovakia': '🇸🇰',
  'Slovenia': '🇸🇮',
  'Switzerland': '🇨🇭',
  'Taiwan': '🇹🇼',
  'Tunisia': '🇹🇳',
  'Ukraine': '🇺🇦',
  'Uruguay': '🇺🇾',
  'Uzbekistan': '🇺🇿',
  'Vatican City': '🇻🇦',
  'Zimbabwe': '🇿🇼',
  
  // Fallback
  'default': '🌍'
};

/**
 * Get flag with multiple fallback methods
 */
export function getFlag(countryName: string, countryCode?: string): string {
  // Debug log to see what we're getting
  console.log('Getting flag for:', { countryName, countryCode });
  
  // Try by country code first if available
  if (countryCode && countryCode.length === 2) {
    try {
      const flagByCode = getCountryFlag(countryCode);
      if (flagByCode !== '🌍') {
        console.log('Flag by code:', flagByCode);
        return flagByCode;
      }
    } catch (error) {
      console.warn('Error getting flag by code:', error);
    }
  }
  
  // Try by country name from country-state-city
  try {
    const flagByName = getCountryFlagByName(countryName);
    if (flagByName !== '🌍') {
      console.log('Flag by name:', flagByName);
      return flagByName;
    }
  } catch (error) {
    console.warn('Error getting flag by name:', error);
  }
  
  // Try from our manual mapping
  if (COUNTRY_FLAGS[countryName]) {
    console.log('Flag from manual mapping:', COUNTRY_FLAGS[countryName]);
    return COUNTRY_FLAGS[countryName];
  }
  
  // Add special handling for common issue cases
  const normalizedCountryName = countryName.toLowerCase().trim();
  
  // Handle common variations
  const countryVariations: { [key: string]: string } = {
    'anguilla': '🇦🇮',
    'usa': '🇺🇸',
    'uk': '🇬🇧',
    'united states of america': '🇺🇸',
    'britain': '🇬🇧',
    'england': '🇬🇧',
  };
  
  if (countryVariations[normalizedCountryName]) {
    console.log('Flag from variations:', countryVariations[normalizedCountryName]);
    return countryVariations[normalizedCountryName];
  }
  
  console.log('Using default flag for:', countryName);
  // Default fallback
  return '🌍';
}