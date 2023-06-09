import { Netmask } from "netmask";
import { AxiosProxyConfig } from 'axios';
export type GEO_API_RESPONSE = {
    asn_number: number;
    asn_organization: string;
    city: string;
    country: string;
    country_code: string;
    ip: string;
    latitude: number;
    longitude: number;
    postal_code: string;
    time_zone: string;
    speed: string;
};
export type API_UPTIME = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    weeks: number;
    years: number;
    speed: string;
};
export type ProxyConfig = AxiosProxyConfig;
export type ProxyProtocols = "https" | "http" | "socks4" | "socks5";
export type Subnet = {
    net: Array<{
        ip: Netmask;
        country: ProxySpace_Countries;
        live: "yes" | "no" | "not-checked";
    }>;
};
export declare enum ProxySpace_Countries {
    "AF" = "AF",
    "Afghanistan" = "AF",
    "AX" = "AX",
    "Aland Islands" = "AX",
    "AL" = "AL",
    "Albania" = "AL",
    "DZ" = "DZ",
    "Algeria" = "DZ",
    "AS" = "AS",
    "AmericanSamoa" = "AS",
    "AD" = "AD",
    "Andorra" = "AD",
    "AO" = "AO",
    "Angola" = "AO",
    "AI" = "AI",
    "Anguilla" = "AI",
    "AQ" = "AQ",
    "Antarctica" = "AQ",
    "AG" = "AG",
    "Antigua and Barbuda" = "AG",
    "AR" = "AR",
    "Argentina" = "AR",
    "AM" = "AM",
    "Armenia" = "AM",
    "AW" = "AW",
    "Aruba" = "AW",
    "AU" = "AU",
    "Australia" = "AU",
    "AT" = "AT",
    "Austria" = "AT",
    "AZ" = "AZ",
    "Azerbaijan" = "AZ",
    "BS" = "BS",
    "Bahamas" = "BS",
    "BH" = "BH",
    "Bahrain" = "BH",
    "BD" = "BD",
    "Bangladesh" = "BD",
    "BB" = "BB",
    "Barbados" = "BB",
    "BY" = "BY",
    "Belarus" = "BY",
    "BE" = "BE",
    "Belgium" = "BE",
    "BZ" = "BZ",
    "Belize" = "BZ",
    "BJ" = "BJ",
    "Benin" = "BJ",
    "BM" = "BM",
    "Bermuda" = "BM",
    "BT" = "BT",
    "Bhutan" = "BT",
    "BO" = "BO",
    "Bolivia, Plurinational State of" = "BO",
    "BA" = "BA",
    "Bosnia and Herzegovina" = "BA",
    "BW" = "BW",
    "Botswana" = "BW",
    "BR" = "BR",
    "Brazil" = "BR",
    "IO" = "IO",
    "British Indian Ocean Territory" = "IO",
    "BN" = "BN",
    "Brunei Darussalam" = "BN",
    "BG" = "BG",
    "Bulgaria" = "BG",
    "BF" = "BF",
    "Burkina Faso" = "BF",
    "BI" = "BI",
    "Burundi" = "BI",
    "KH" = "KH",
    "Cambodia" = "KH",
    "CM" = "CM",
    "Cameroon" = "CM",
    "CA" = "CA",
    "Canada" = "CA",
    "CV" = "CV",
    "Cape Verde" = "CV",
    "KY" = "KY",
    "Cayman Islands" = "KY",
    "CF" = "CF",
    "Central African Republic" = "CF",
    "TD" = "TD",
    "Chad" = "TD",
    "CL" = "CL",
    "Chile" = "CL",
    "CN" = "CN",
    "China" = "CN",
    "CX" = "CX",
    "Christmas Island" = "CX",
    "CC" = "CC",
    "Cocos (Keeling) Islands" = "CC",
    "CO" = "CO",
    "Colombia" = "CO",
    "KM" = "KM",
    "Comoros" = "KM",
    "CG" = "CG",
    "Congo" = "CG",
    "CD" = "CD",
    "Congo, The Democratic Republic of the Congo" = "CD",
    "CK" = "CK",
    "Cook Islands" = "CK",
    "CR" = "CR",
    "Costa Rica" = "CR",
    "CI" = "CI",
    "Cote d'Ivoire" = "CI",
    "HR" = "HR",
    "Croatia" = "HR",
    "CU" = "CU",
    "Cuba" = "CU",
    "CY" = "CY",
    "Cyprus" = "CY",
    "CZ" = "CZ",
    "Czech Republic" = "CZ",
    "DK" = "DK",
    "Denmark" = "DK",
    "DJ" = "DJ",
    "Djibouti" = "DJ",
    "DM" = "DM",
    "Dominica" = "DM",
    "DO" = "DO",
    "Dominican Republic" = "DO",
    "EC" = "EC",
    "Ecuador" = "EC",
    "EG" = "EG",
    "Egypt" = "EG",
    "SV" = "SV",
    "El Salvador" = "SV",
    "GQ" = "GQ",
    "Equatorial Guinea" = "GQ",
    "ER" = "ER",
    "Eritrea" = "ER",
    "EE" = "EE",
    "Estonia" = "EE",
    "ET" = "ET",
    "Ethiopia" = "ET",
    "FK" = "FK",
    "Falkland Islands (Malvinas)" = "FK",
    "FO" = "FO",
    "Faroe Islands" = "FO",
    "FJ" = "FJ",
    "Fiji" = "FJ",
    "FI" = "FI",
    "Finland" = "FI",
    "FR" = "FR",
    "France" = "FR",
    "GF" = "GF",
    "French Guiana" = "GF",
    "PF" = "PF",
    "French Polynesia" = "PF",
    "GA" = "GA",
    "Gabon" = "GA",
    "GM" = "GM",
    "Gambia" = "GM",
    "GE" = "GE",
    "Georgia" = "GE",
    "DE" = "DE",
    "Germany" = "DE",
    "GH" = "GH",
    "Ghana" = "GH",
    "GI" = "GI",
    "Gibraltar" = "GI",
    "GR" = "GR",
    "Greece" = "GR",
    "GL" = "GL",
    "Greenland" = "GL",
    "GD" = "GD",
    "Grenada" = "GD",
    "GP" = "GP",
    "Guadeloupe" = "GP",
    "GU" = "GU",
    "Guam" = "GU",
    "GT" = "GT",
    "Guatemala" = "GT",
    "GG" = "GG",
    "Guernsey" = "GG",
    "GN" = "GN",
    "Guinea" = "GN",
    "GW" = "GW",
    "Guinea-Bissau" = "GW",
    "GY" = "GY",
    "Guyana" = "GY",
    "HT" = "HT",
    "Haiti" = "HT",
    "VA" = "VA",
    "Holy See (Vatican City State)" = "VA",
    "HN" = "HN",
    "Honduras" = "HN",
    "HK" = "HK",
    "Hong Kong" = "HK",
    "HU" = "HU",
    "Hungary" = "HU",
    "IS" = "IS",
    "Iceland" = "IS",
    "IN" = "IN",
    "India" = "IN",
    "ID" = "ID",
    "Indonesia" = "ID",
    "IR" = "IR",
    "Iran, Islamic Republic of Persian Gulf" = "IR",
    "IQ" = "IQ",
    "Iraq" = "IQ",
    "IE" = "IE",
    "Ireland" = "IE",
    "IM" = "IM",
    "Isle of Man" = "IM",
    "IL" = "IL",
    "Israel" = "IL",
    "IT" = "IT",
    "Italy" = "IT",
    "JM" = "JM",
    "Jamaica" = "JM",
    "JP" = "JP",
    "Japan" = "JP",
    "JE" = "JE",
    "Jersey" = "JE",
    "JO" = "JO",
    "Jordan" = "JO",
    "KZ" = "KZ",
    "Kazakhstan" = "KZ",
    "KE" = "KE",
    "Kenya" = "KE",
    "KI" = "KI",
    "Kiribati" = "KI",
    "KP" = "KP",
    "Korea, Democratic People's Republic of Korea" = "KP",
    "KR" = "KR",
    "Korea, Republic of South Korea" = "KR",
    "KW" = "KW",
    "Kuwait" = "KW",
    "KG" = "KG",
    "Kyrgyzstan" = "KG",
    "LA" = "LA",
    "Laos" = "LA",
    "LV" = "LV",
    "Latvia" = "LV",
    "LB" = "LB",
    "Lebanon" = "LB",
    "LS" = "LS",
    "Lesotho" = "LS",
    "LR" = "LR",
    "Liberia" = "LR",
    "LY" = "LY",
    "Libyan Arab Jamahiriya" = "LY",
    "LI" = "LI",
    "Liechtenstein" = "LI",
    "LT" = "LT",
    "Lithuania" = "LT",
    "LU" = "LU",
    "Luxembourg" = "LU",
    "MO" = "MO",
    "Macao" = "MO",
    "MK" = "MK",
    "Macedonia" = "MK",
    "MG" = "MG",
    "Madagascar" = "MG",
    "MW" = "MW",
    "Malawi" = "MW",
    "MY" = "MY",
    "Malaysia" = "MY",
    "MV" = "MV",
    "Maldives" = "MV",
    "ML" = "ML",
    "Mali" = "ML",
    "MT" = "MT",
    "Malta" = "MT",
    "MH" = "MH",
    "Marshall Islands" = "MH",
    "MQ" = "MQ",
    "Martinique" = "MQ",
    "MR" = "MR",
    "Mauritania" = "MR",
    "MU" = "MU",
    "Mauritius" = "MU",
    "YT" = "YT",
    "Mayotte" = "YT",
    "MX" = "MX",
    "Mexico" = "MX",
    "FM" = "FM",
    "Micronesia, Federated States of Micronesia" = "FM",
    "MD" = "MD",
    "Moldova" = "MD",
    "MC" = "MC",
    "Monaco" = "MC",
    "MN" = "MN",
    "Mongolia" = "MN",
    "ME" = "ME",
    "Montenegro" = "ME",
    "MS" = "MS",
    "Montserrat" = "MS",
    "MA" = "MA",
    "Morocco" = "MA",
    "MZ" = "MZ",
    "Mozambique" = "MZ",
    "MM" = "MM",
    "Myanmar" = "MM",
    "NA" = "NA",
    "Namibia" = "NA",
    "NR" = "NR",
    "Nauru" = "NR",
    "NP" = "NP",
    "Nepal" = "NP",
    "NL" = "NL",
    "Netherlands" = "NL",
    "AN" = "AN",
    "Netherlands Antilles" = "AN",
    "NC" = "NC",
    "New Caledonia" = "NC",
    "NZ" = "NZ",
    "New Zealand" = "NZ",
    "NI" = "NI",
    "Nicaragua" = "NI",
    "NE" = "NE",
    "Niger" = "NE",
    "NG" = "NG",
    "Nigeria" = "NG",
    "NU" = "NU",
    "Niue" = "NU",
    "NF" = "NF",
    "Norfolk Island" = "NF",
    "MP" = "MP",
    "Northern Mariana Islands" = "MP",
    "NO" = "NO",
    "Norway" = "NO",
    "OM" = "OM",
    "Oman" = "OM",
    "PK" = "PK",
    "Pakistan" = "PK",
    "PW" = "PW",
    "Palau" = "PW",
    "PS" = "PS",
    "Palestinian Territory, Occupied" = "PS",
    "PA" = "PA",
    "Panama" = "PA",
    "PG" = "PG",
    "Papua New Guinea" = "PG",
    "PY" = "PY",
    "Paraguay" = "PY",
    "PE" = "PE",
    "Peru" = "PE",
    "PH" = "PH",
    "Philippines" = "PH",
    "PN" = "PN",
    "Pitcairn" = "PN",
    "PL" = "PL",
    "Poland" = "PL",
    "PT" = "PT",
    "Portugal" = "PT",
    "PR" = "PR",
    "Puerto Rico" = "PR",
    "QA" = "QA",
    "Qatar" = "QA",
    "RO" = "RO",
    "Romania" = "RO",
    "RU" = "RU",
    "Russia" = "RU",
    "RW" = "RW",
    "Rwanda" = "RW",
    "RE" = "RE",
    "Reunion" = "RE",
    "BL" = "BL",
    "Saint Barthelemy" = "BL",
    "SH" = "SH",
    "Saint Helena, Ascension and Tristan Da Cunha" = "SH",
    "KN" = "KN",
    "Saint Kitts and Nevis" = "KN",
    "LC" = "LC",
    "Saint Lucia" = "LC",
    "MF" = "MF",
    "Saint Martin" = "MF",
    "PM" = "PM",
    "Saint Pierre and Miquelon" = "PM",
    "VC" = "VC",
    "Saint Vincent and the Grenadines" = "VC",
    "WS" = "WS",
    "Samoa" = "WS",
    "SM" = "SM",
    "San Marino" = "SM",
    "ST" = "ST",
    "Sao Tome and Principe" = "ST",
    "SA" = "SA",
    "Saudi Arabia" = "SA",
    "SN" = "SN",
    "Senegal" = "SN",
    "RS" = "RS",
    "Serbia" = "RS",
    "SC" = "SC",
    "Seychelles" = "SC",
    "SL" = "SL",
    "Sierra Leone" = "SL",
    "SG" = "SG",
    "Singapore" = "SG",
    "SK" = "SK",
    "Slovakia" = "SK",
    "SI" = "SI",
    "Slovenia" = "SI",
    "SB" = "SB",
    "Solomon Islands" = "SB",
    "SO" = "SO",
    "Somalia" = "SO",
    "ZA" = "ZA",
    "South Africa" = "ZA",
    "SS" = "SS",
    "South Sudan" = "SS",
    "GS" = "GS",
    "South Georgia and the South Sandwich Islands" = "GS",
    "ES" = "ES",
    "Spain" = "ES",
    "LK" = "LK",
    "Sri Lanka" = "LK",
    "SD" = "SD",
    "Sudan" = "SD",
    "SR" = "SR",
    "Suriname" = "SR",
    "SJ" = "SJ",
    "Svalbard and Jan Mayen" = "SJ",
    "SZ" = "SZ",
    "Swaziland" = "SZ",
    "SE" = "SE",
    "Sweden" = "SE",
    "CH" = "CH",
    "Switzerland" = "CH",
    "SY" = "SY",
    "Syrian Arab Republic" = "SY",
    "TW" = "TW",
    "Taiwan" = "TW",
    "TJ" = "TJ",
    "Tajikistan" = "TJ",
    "TZ" = "TZ",
    "Tanzania, United Republic of Tanzania" = "TZ",
    "TH" = "TH",
    "Thailand" = "TH",
    "TL" = "TL",
    "Timor-Leste" = "TL",
    "TG" = "TG",
    "Togo" = "TG",
    "TK" = "TK",
    "Tokelau" = "TK",
    "TO" = "TO",
    "Tonga" = "TO",
    "TT" = "TT",
    "Trinidad and Tobago" = "TT",
    "TN" = "TN",
    "Tunisia" = "TN",
    "TR" = "TR",
    "Turkey" = "TR",
    "TM" = "TM",
    "Turkmenistan" = "TM",
    "TC" = "TC",
    "Turks and Caicos Islands" = "TC",
    "TV" = "TV",
    "Tuvalu" = "TV",
    "UG" = "UG",
    "Uganda" = "UG",
    "UA" = "UA",
    "Ukraine" = "UA",
    "AE" = "AE",
    "United Arab Emirates" = "AE",
    "GB" = "GB",
    "United Kingdom" = "GB",
    "US" = "US",
    "United States" = "US",
    "UY" = "UY",
    "Uruguay" = "UY",
    "UZ" = "UZ",
    "Uzbekistan" = "UZ",
    "VU" = "VU",
    "Vanuatu" = "VU",
    "VE" = "VE",
    "Venezuela, Bolivarian Republic of Venezuela" = "VE",
    "VN" = "VN",
    "Vietnam" = "VN",
    "VG" = "VG",
    "Virgin Islands, British" = "VG",
    "VI" = "VI",
    "Virgin Islands, U.S." = "VI",
    "WF" = "WF",
    "Wallis and Futuna" = "WF",
    "YE" = "YE",
    "Yemen" = "YE",
    "ZM" = "ZM",
    "Zambia" = "ZM",
    "ZW" = "ZW",
    "Zimbabwe" = "ZW"
}
