import React, { useCallback } from 'react';
import { Picker } from 'react-native';

export default function LocationPicker({ onLocationChange }) {

    const changeLocationState = useCallback((state) => {
        onLocationChange(state)
    }, [onLocationChange])

    return (
        <Picker style={{margin: 10, color: "gray"}} onValueChange={(itemValue) => changeLocationState(itemValue)}>
            <Picker.Item value="" label="Select country" />
            <Picker.Item value="Afghanistan" label="Afghanistan" />
            <Picker.Item value="Åland Islands" label="Åland Islands" />
            <Picker.Item value="Albania" label="Albania" />
            <Picker.Item value="Algeria" label="Algeria" />
            <Picker.Item value="American Samoa" label="American Samoa" />
            <Picker.Item value="Andorra" label="Andorra" />
            <Picker.Item value="Angola" label="Angola" />
            <Picker.Item value="Anguilla" label="Anguilla" />
            <Picker.Item value="Antarctica" label="Antarctica" />
            <Picker.Item value="Antigua and Barbuda" label="Antigua and Barbuda" />
            <Picker.Item value="Argentina" label="Argentina" />
            <Picker.Item value="Armenia" label="Armenia" />
            <Picker.Item value="Aruba" label="Aruba" />
            <Picker.Item value="Australia" label="Australia" />
            <Picker.Item value="Austria" label="Austria" />
            <Picker.Item value="Azerbaijan" label="Azerbaijan" />
            <Picker.Item value="Bahamas" label="Bahamas" />
            <Picker.Item value="Bahrain" label="Bahrain" />
            <Picker.Item value="Bangladesh" label="Bangladesh" />
            <Picker.Item value="Barbados" label="Barbados" />
            <Picker.Item value="Belarus" label="Belarus" />
            <Picker.Item value="Belgium" label="Belgium" />
            <Picker.Item value="Belize" label="Belize" />
            <Picker.Item value="Benin" label="Benin" />
            <Picker.Item value="Bermuda" label="Bermuda" />
            <Picker.Item value="Bhutan" label="Bhutan" />
            <Picker.Item value="Bolivia" label="Bolivia" />
            <Picker.Item value="Bosnia and Herzegovina" label="Bosnia and Herzegovina" />
            <Picker.Item value="Botswana" label="Botswana" />
            <Picker.Item value="Bouvet Island" label="Bouvet Island" />
            <Picker.Item value="Brazil" label="Brazil" />
            <Picker.Item value="British Indian Ocean Territory" label="British Indian Ocean Territory" />
            <Picker.Item value="Brunei Darussalam" label="Brunei Darussalam" />
            <Picker.Item value="Bulgaria" label="Bulgaria" />
            <Picker.Item value="Burkina Faso" label="Burkina Faso" />
            <Picker.Item value="Burundi" label="Burundi" />
            <Picker.Item value="Cambodia" label="Cambodia" />
            <Picker.Item value="Cameroon" label="Cameroon" />
            <Picker.Item value="Canada" label="Canada" />
            <Picker.Item value="Cape Verde" label="Cape Verde" />
            <Picker.Item value="Cayman Islands" label="Cayman Islands" />
            <Picker.Item value="Central African Republic" label="Central African Republic" />
            <Picker.Item value="Chad" label="Chad" />
            <Picker.Item value="Chile" label="Chile" />
            <Picker.Item value="China" label="China" />
            <Picker.Item value="Christmas Island" label="Christmas Island" />
            <Picker.Item value="Cocos (Keeling) Islands" label="Cocos (Keeling) Islands" />
            <Picker.Item value="Colombia" label="Colombia" />
            <Picker.Item value="Comoros" label="Comoros" />
            <Picker.Item value="Congo" label="Congo" />
            <Picker.Item value="Congo, The Democratic Republic of The" label="Congo, The Democratic Republic of The" />
            <Picker.Item value="Cook Islands" label="Cook Islands" />
            <Picker.Item value="Costa Rica" label="Costa Rica" />
            <Picker.Item value="Cote D'ivoire" label="Cote D'ivoire" />
            <Picker.Item value="Croatia" label="Croatia" />
            <Picker.Item value="Cuba" label="Cuba" />
            <Picker.Item value="Cyprus" label="Cyprus" />
            <Picker.Item value="Czech Republic" label="Czech Republic" />
            <Picker.Item value="Denmark" label="Denmark" />
            <Picker.Item value="Djibouti" label="Djibouti" />
            <Picker.Item value="Dominica" label="Dominica" />
            <Picker.Item value="Dominican Republic" label="Dominican Republic" />
            <Picker.Item value="Ecuador" label="Ecuador" />
            <Picker.Item value="Egypt" label="Egypt" />
            <Picker.Item value="El Salvador" label="El Salvador" />
            <Picker.Item value="Equatorial Guinea" label="Equatorial Guinea" />
            <Picker.Item value="Eritrea" label="Eritrea" />
            <Picker.Item value="Estonia" label="Estonia" />
            <Picker.Item value="Ethiopia" label="Ethiopia" />
            <Picker.Item value="Falkland Islands (Malvinas)" label="Falkland Islands (Malvinas)" />
            <Picker.Item value="Faroe Islands" label="Faroe Islands" />
            <Picker.Item value="Fiji" label="Fiji" />
            <Picker.Item value="Finland" label="Finland" />
            <Picker.Item value="France" label="France" />
            <Picker.Item value="French Guiana" label="French Guiana" />
            <Picker.Item value="French Polynesia" label="French Polynesia" />
            <Picker.Item value="French Southern Territories" label="French Southern Territories" />
            <Picker.Item value="Gabon" label="Gabon" />
            <Picker.Item value="Gambia" label="Gambia" />
            <Picker.Item value="Georgia" label="Georgia" />
            <Picker.Item value="Germany" label="Germany" />
            <Picker.Item value="Ghana" label="Ghana" />
            <Picker.Item value="Gibraltar" label="Gibraltar" />
            <Picker.Item value="Greece" label="Greece" />
            <Picker.Item value="Greenland" label="Greenland" />
            <Picker.Item value="Grenada" label="Grenada" />
            <Picker.Item value="Guadeloupe" label="Guadeloupe" />
            <Picker.Item value="Guam" label="Guam" />
            <Picker.Item value="Guatemala" label="Guatemala" />
            <Picker.Item value="Guernsey" label="Guernsey" />
            <Picker.Item value="Guinea" label="Guinea" />
            <Picker.Item value="Guinea-bissau" label="Guinea-bissau" />
            <Picker.Item value="Guyana" label="Guyana" />
            <Picker.Item value="Haiti" label="Haiti" />
            <Picker.Item value="Heard Island and Mcdonald Islands" label="Heard Island and Mcdonald Islands" />
            <Picker.Item value="Holy See (Vatican City State)" label="Holy See (Vatican City State)" />
            <Picker.Item value="Honduras" label="Honduras" />
            <Picker.Item value="Hong Kong" label="Hong Kong" />
            <Picker.Item value="Hungary" label="Hungary" />
            <Picker.Item value="Iceland" label="Iceland" />
            <Picker.Item value="India" label="India" />
            <Picker.Item value="Indonesia" label="Indonesia" />
            <Picker.Item value="Iran, Islamic Republic of" label="Iran, Islamic Republic of" />
            <Picker.Item value="Iraq" label="Iraq" />
            <Picker.Item value="Ireland" label="Ireland" />
            <Picker.Item value="Isle of Man" label="Isle of Man" />
            <Picker.Item value="Israel" label="Israel" />
            <Picker.Item value="Italy" label="Italy" />
            <Picker.Item value="Jamaica" label="Jamaica" />
            <Picker.Item value="Japan" label="Japan" />
            <Picker.Item value="Jersey" label="Jersey" />
            <Picker.Item value="Jordan" label="Jordan" />
            <Picker.Item value="Kazakhstan" label="Kazakhstan" />
            <Picker.Item value="Kenya" label="Kenya" />
            <Picker.Item value="Kiribati" label="Kiribati" />
            <Picker.Item value="Korea, Democratic People's Republic of" label="Korea, Democratic People's Republic of" />
            <Picker.Item value="Korea, Republic of" label="Korea, Republic of" />
            <Picker.Item value="Kuwait" label="Kuwait" />
            <Picker.Item value="Kyrgyzstan" label="Kyrgyzstan" />
            <Picker.Item value="Lao People's Democratic Republic" label="Lao People's Democratic Republic" />
            <Picker.Item value="Latvia" label="Latvia" />
            <Picker.Item value="Lebanon" label="Lebanon" />
            <Picker.Item value="Lesotho" label="Lesotho" />
            <Picker.Item value="Liberia" label="Liberia" />
            <Picker.Item value="Libyan Arab Jamahiriya" label="Libyan Arab Jamahiriya" />
            <Picker.Item value="Liechtenstein" label="Liechtenstein" />
            <Picker.Item value="Lithuania" label="Lithuania" />
            <Picker.Item value="Luxembourg" label="Luxembourg" />
            <Picker.Item value="Macao" label="Macao" />
            <Picker.Item value="Macedonia, The Former Yugoslav Republic of" label="Macedonia, The Former Yugoslav Republic of" />
            <Picker.Item value="Madagascar" label="Madagascar" />
            <Picker.Item value="Malawi" label="Malawi" />
            <Picker.Item value="Malaysia" label="Malaysia" />
            <Picker.Item value="Maldives" label="Maldives" />
            <Picker.Item value="Mali" label="Mali" />
            <Picker.Item value="Malta" label="Malta" />
            <Picker.Item value="Marshall Islands" label="Marshall Islands" />
            <Picker.Item value="Martinique" label="Martinique" />
            <Picker.Item value="Mauritania" label="Mauritania" />
            <Picker.Item value="Mauritius" label="Mauritius" />
            <Picker.Item value="Mayotte" label="Mayotte" />
            <Picker.Item value="Mexico" label="Mexico" />
            <Picker.Item value="Micronesia, Federated States of" label="Micronesia, Federated States of" />
            <Picker.Item value="Moldova, Republic of" label="Moldova, Republic of" />
            <Picker.Item value="Monaco" label="Monaco" />
            <Picker.Item value="Mongolia" label="Mongolia" />
            <Picker.Item value="Montenegro" label="Montenegro" />
            <Picker.Item value="Montserrat" label="Montserrat" />
            <Picker.Item value="Morocco" label="Morocco" />
            <Picker.Item value="Mozambique" label="Mozambique" />
            <Picker.Item value="Myanmar" label="Myanmar" />
            <Picker.Item value="Namibia" label="Namibia" />
            <Picker.Item value="Nauru" label="Nauru" />
            <Picker.Item value="Nepal" label="Nepal" />
            <Picker.Item value="Netherlands" label="Netherlands" />
            <Picker.Item value="Netherlands Antilles" label="Netherlands Antilles" />
            <Picker.Item value="New Caledonia" label="New Caledonia" />
            <Picker.Item value="New Zealand" label="New Zealand" />
            <Picker.Item value="Nicaragua" label="Nicaragua" />
            <Picker.Item value="Niger" label="Niger" />
            <Picker.Item value="Nigeria" label="Nigeria" />
            <Picker.Item value="Niue" label="Niue" />
            <Picker.Item value="Norfolk Island" label="Norfolk Island" />
            <Picker.Item value="Northern Mariana Islands" label="Northern Mariana Islands" />
            <Picker.Item value="Norway" label="Norway" />
            <Picker.Item value="Oman" label="Oman" />
            <Picker.Item value="Pakistan" label="Pakistan" />
            <Picker.Item value="Palau" label="Palau" />
            <Picker.Item value="Palestinian Territory, Occupied" label="Palestinian Territory, Occupied" />
            <Picker.Item value="Panama" label="Panama" />
            <Picker.Item value="Papua New Guinea" label="Papua New Guinea" />
            <Picker.Item value="Paraguay" label="Paraguay" />
            <Picker.Item value="Peru" label="Peru" />
            <Picker.Item value="Philippines" label="Philippines" />
            <Picker.Item value="Pitcairn" label="Pitcairn" />
            <Picker.Item value="Poland" label="Poland" />
            <Picker.Item value="Portugal" label="Portugal" />
            <Picker.Item value="Puerto Rico" label="Puerto Rico" />
            <Picker.Item value="Qatar" label="Qatar" />
            <Picker.Item value="Reunion" label="Reunion" />
            <Picker.Item value="Romania" label="Romania" />
            <Picker.Item value="Russian Federation" label="Russian Federation" />
            <Picker.Item value="Rwanda" label="Rwanda" />
            <Picker.Item value="Saint Helena" label="Saint Helena" />
            <Picker.Item value="Saint Kitts and Nevis" label="Saint Kitts and Nevis" />
            <Picker.Item value="Saint Lucia" label="Saint Lucia" />
            <Picker.Item value="Saint Pierre and Miquelon" label="Saint Pierre and Miquelon" />
            <Picker.Item value="Saint Vincent and The Grenadines" label="Saint Vincent and The Grenadines" />
            <Picker.Item value="Samoa" label="Samoa" />
            <Picker.Item value="San Marino" label="San Marino" />
            <Picker.Item value="Sao Tome and Principe" label="Sao Tome and Principe" />
            <Picker.Item value="Saudi Arabia" label="Saudi Arabia" />
            <Picker.Item value="Senegal" label="Senegal" />
            <Picker.Item value="Serbia" label="Serbia" />
            <Picker.Item value="Seychelles" label="Seychelles" />
            <Picker.Item value="Sierra Leone" label="Sierra Leone" />
            <Picker.Item value="Singapore" label="Singapore" />
            <Picker.Item value="Slovakia" label="Slovakia" />
            <Picker.Item value="Slovenia" label="Slovenia" />
            <Picker.Item value="Solomon Islands" label="Solomon Islands" />
            <Picker.Item value="Somalia" label="Somalia" />
            <Picker.Item value="South Africa" label="South Africa" />
            <Picker.Item value="South Georgia and The South Sandwich Islands" label="South Georgia and The South Sandwich Islands" />
            <Picker.Item value="Spain" label="Spain" />
            <Picker.Item value="Sri Lanka" label="Sri Lanka" />
            <Picker.Item value="Sudan" label="Sudan" />
            <Picker.Item value="Suriname" label="Suriname" />
            <Picker.Item value="Svalbard and Jan Mayen" label="Svalbard and Jan Mayen" />
            <Picker.Item value="Swaziland" label="Swaziland" />
            <Picker.Item value="Sweden" label="Sweden" />
            <Picker.Item value="Switzerland" label="Switzerland" />
            <Picker.Item value="Syrian Arab Republic" label="Syrian Arab Republic" />
            <Picker.Item value="Taiwan" label="Taiwan" />
            <Picker.Item value="Tajikistan" label="Tajikistan" />
            <Picker.Item value="Tanzania, United Republic of" label="Tanzania, United Republic of" />
            <Picker.Item value="Thailand" label="Thailand" />
            <Picker.Item value="Timor-leste" label="Timor-leste" />
            <Picker.Item value="Togo" label="Togo" />
            <Picker.Item value="Tokelau" label="Tokelau" />
            <Picker.Item value="Tonga" label="Tonga" />
            <Picker.Item value="Trinidad and Tobago" label="Trinidad and Tobago" />
            <Picker.Item value="Tunisia" label="Tunisia" />
            <Picker.Item value="Turkey" label="Turkey" />
            <Picker.Item value="Turkmenistan" label="Turkmenistan" />
            <Picker.Item value="Turks and Caicos Islands" label="Turks and Caicos Islands" />
            <Picker.Item value="Tuvalu" label="Tuvalu" />
            <Picker.Item value="Uganda" label="Uganda" />
            <Picker.Item value="Ukraine" label="Ukraine" />
            <Picker.Item value="United Arab Emirates" label="United Arab Emirates" />
            <Picker.Item value="United Kingdom" label="United Kingdom" />
            <Picker.Item value="United States" label="United States" />
            <Picker.Item value="United States Minor Outlying Islands" label="United States Minor Outlying Islands" />
            <Picker.Item value="Uruguay" label="Uruguay" />
            <Picker.Item value="Uzbekistan" label="Uzbekistan" />
            <Picker.Item value="Vanuatu" label="Vanuatu" />
            <Picker.Item value="Venezuela" label="Venezuela" />
            <Picker.Item value="Viet Nam" label="Viet Nam" />
            <Picker.Item value="Virgin Islands, British" label="Virgin Islands, British" />
            <Picker.Item value="Virgin Islands, U.S." label="Virgin Islands, U.S." />
            <Picker.Item value="Wallis and Futuna" label="Wallis and Futuna" />
            <Picker.Item value="Western Sahara" label="Western Sahara" />
            <Picker.Item value="Yemen" label="Yemen" />
            <Picker.Item value="Zambia" label="Zambia" />
            <Picker.Item value="Zimbabwe" label="Zimbabwe" />
        </Picker>
    );
}