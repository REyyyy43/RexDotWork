// Mapa de países por código numérico con estados y ciudades
export const countryMap = {
  // América Latina
  '58': {
    name: 'Venezuela',
    code: '+58',
    states: {
      'Amazonas': ['Puerto Ayacucho', 'San Fernando de Atabapo'],
      'Anzoátegui': ['Barcelona', 'Puerto La Cruz', 'El Tigre'],
      'Apure': ['San Fernando de Apure', 'Guasdualito'],
      'Aragua': ['Maracay', 'La Victoria', 'Turmero'],
      'Barinas': ['Barinas', 'Barinitas'],
      'Bolívar': ['Ciudad Bolívar', 'Puerto Ordaz', 'Ciudad Guayana'],
      'Carabobo': ['Valencia', 'Puerto Cabello', 'Guacara'],
      'Cojedes': ['San Carlos', 'Tinaquillo'],
      'Delta Amacuro': ['Tucupita', 'Pedernales'],
      'Distrito Capital': ['Caracas'],
      'Falcón': ['Coro', 'Punto Fijo', 'La Vela'],
      'Guárico': ['San Juan de los Morros', 'Valle de la Pascua'],
      'Lara': ['Barquisimeto', 'Carora', 'El Tocuyo'],
      'Mérida': ['Mérida', 'El Vigía', 'Tovar'],
      'Miranda': ['Los Teques', 'Petare', 'Guarenas'],
      'Monagas': ['Maturín', 'Punta de Mata'],
      'Nueva Esparta': ['La Asunción', 'Porlamar', 'Pampatar'],
      'Portuguesa': ['Guanare', 'Acarigua', 'Araure'],
      'Sucre': ['Cumaná', 'Carúpano', 'Güiria'],
      'Táchira': ['San Cristóbal', 'Táriba', 'La Fría'],
      'Trujillo': ['Trujillo', 'Valera', 'Boconó'],
      'Vargas': ['La Guaira', 'Catia La Mar'],
      'Yaracuy': ['San Felipe', 'Yaritagua'],
      'Zulia': ['Maracaibo', 'Cabimas', 'Ciudad Ojeda']
    }
  },
  '57': {
    name: 'Colombia',
    code: '+57',
    states: {
      'Amazonas': ['Leticia', 'Puerto Nariño'],
      'Antioquia': ['Medellín', 'Bello', 'Envigado'],
      'Arauca': ['Arauca', 'Saravena'],
      'Atlántico': ['Barranquilla', 'Soledad', 'Malambo'],
      'Bolívar': ['Cartagena', 'Magangué', 'Turbaco'],
      'Boyacá': ['Tunja', 'Duitama', 'Sogamoso'],
      'Caldas': ['Manizales', 'La Dorada', 'Chinchiná'],
      'Caquetá': ['Florencia', 'San Vicente del Caguán'],
      'Casanare': ['Yopal', 'Aguazul'],
      'Cauca': ['Popayán', 'Santander de Quilichao'],
      'Cesar': ['Valledupar', 'Aguachica'],
      'Chocó': ['Quibdó', 'Istmina'],
      'Córdoba': ['Montería', 'Lorica', 'Sahagún'],
      'Cundinamarca': ['Bogotá', 'Soacha', 'Girardot'],
      'Guainía': ['Inírida'],
      'Guaviare': ['San José del Guaviare'],
      'Huila': ['Neiva', 'Pitalito', 'Garzón'],
      'La Guajira': ['Riohacha', 'Maicao'],
      'Magdalena': ['Santa Marta', 'Ciénaga'],
      'Meta': ['Villavicencio', 'Acacías', 'Granada'],
      'Nariño': ['Pasto', 'Tumaco', 'Ipiales'],
      'Norte de Santander': ['Cúcuta', 'Ocaña', 'Pamplona'],
      'Putumayo': ['Mocoa', 'Puerto Asís'],
      'Quindío': ['Armenia', 'Calarcá', 'La Tebaida'],
      'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'],
      'San Andrés y Providencia': ['San Andrés', 'Providencia'],
      'Santander': ['Bucaramanga', 'Floridablanca', 'Girón'],
      'Sucre': ['Sincelejo', 'Corozal', 'Sampués'],
      'Tolima': ['Ibagué', 'Espinal', 'Honda'],
      'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura'],
      'Vaupés': ['Mitú'],
      'Vichada': ['Puerto Carreño']
    }
  },
  '52': {
    name: 'México',
    code: '+52',
    states: {
      'Aguascalientes': ['Aguascalientes', 'Calvillo', 'Jesús María'],
      'Baja California': ['Tijuana', 'Mexicali', 'Ensenada'],
      'Baja California Sur': ['La Paz', 'Cabo San Lucas', 'San José del Cabo'],
      'Campeche': ['Campeche', 'Ciudad del Carmen'],
      'Chiapas': ['Tuxtla Gutiérrez', 'San Cristóbal de las Casas', 'Tapachula'],
      'Chihuahua': ['Chihuahua', 'Ciudad Juárez', 'Cuauhtémoc'],
      'Ciudad de México': ['Ciudad de México'],
      'Coahuila': ['Saltillo', 'Torreón', 'Monclova'],
      'Colima': ['Colima', 'Manzanillo', 'Tecomán'],
      'Durango': ['Durango', 'Gómez Palacio', 'Lerdo'],
      'Estado de México': ['Toluca', 'Ecatepec', 'Naucalpan'],
      'Guanajuato': ['León', 'Irapuato', 'Celaya'],
      'Guerrero': ['Chilpancingo', 'Acapulco', 'Iguala'],
      'Hidalgo': ['Pachuca', 'Tula', 'Tizayuca'],
      'Jalisco': ['Guadalajara', 'Zapopan', 'Tlaquepaque'],
      'Michoacán': ['Morelia', 'Uruapan', 'Zamora'],
      'Morelos': ['Cuernavaca', 'Cuautla', 'Ayala'],
      'Nayarit': ['Tepic', 'Bahía de Banderas'],
      'Nuevo León': ['Monterrey', 'Guadalupe', 'San Nicolás de los Garza'],
      'Oaxaca': ['Oaxaca de Juárez', 'Tuxtepec', 'Salina Cruz'],
      'Puebla': ['Puebla', 'Tehuacán', 'Amozoc'],
      'Querétaro': ['Querétaro', 'San Juan del Río', 'Corregidora'],
      'Quintana Roo': ['Cancún', 'Chetumal', 'Playa del Carmen'],
      'San Luis Potosí': ['San Luis Potosí', 'Soledad de Graciano Sánchez'],
      'Sinaloa': ['Culiacán', 'Mazatlán', 'Los Mochis'],
      'Sonora': ['Hermosillo', 'Ciudad Obregón', 'Nogales'],
      'Tabasco': ['Villahermosa', 'Cárdenas', 'Comalcalco'],
      'Tamaulipas': ['Ciudad Victoria', 'Reynosa', 'Matamoros'],
      'Tlaxcala': ['Tlaxcala', 'Apizaco', 'Chiautempan'],
      'Veracruz': ['Xalapa', 'Veracruz', 'Coatzacoalcos'],
      'Yucatán': ['Mérida', 'Valladolid', 'Progreso'],
      'Zacatecas': ['Zacatecas', 'Fresnillo', 'Aguascalientes']
    }
  },
  '54': {
    name: 'Argentina',
    code: '+54',
    states: {
      'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca'],
      'Ciudad Autónoma de Buenos Aires': ['Buenos Aires'],
      'Catamarca': ['San Fernando del Valle de Catamarca', 'San Fdo del Valle de Catamarca'],
      'Chaco': ['Resistencia', 'Sáenz Peña', 'Charata'],
      'Chubut': ['Rawson', 'Comodoro Rivadavia', 'Trelew'],
      'Córdoba': ['Córdoba', 'Río Cuarto', 'Villa María'],
      'Corrientes': ['Corrientes', 'Goya', 'Mercedes'],
      'Entre Ríos': ['Paraná', 'Concordia', 'Gualeguaychú'],
      'Formosa': ['Formosa', 'Clorinda', 'Pirané'],
      'Jujuy': ['San Salvador de Jujuy', 'San Pedro de Jujuy', 'Libertador General San Martín'],
      'La Pampa': ['Santa Rosa', 'General Pico', 'Toay'],
      'La Rioja': ['La Rioja', 'Chilecito', 'Aimogasta'],
      'Mendoza': ['Mendoza', 'San Rafael', 'San Martín'],
      'Misiones': ['Posadas', 'Oberá', 'Eldorado'],
      'Neuquén': ['Neuquén', 'Cutral Có', 'Plottier'],
      'Río Negro': ['Viedma', 'General Roca', 'Bariloche'],
      'Salta': ['Salta', 'San Ramón de la Nueva Orán', 'Tartagal'],
      'San Juan': ['San Juan', 'Caucete', 'Rivadavia'],
      'San Luis': ['San Luis', 'Villa Mercedes', 'La Punta'],
      'Santa Cruz': ['Río Gallegos', 'Caleta Olivia', 'El Calafate'],
      'Santa Fe': ['Santa Fe', 'Rosario', 'Venado Tuerto'],
      'Santiago del Estero': ['Santiago del Estero', 'La Banda', 'Termas de Río Hondo'],
      'Tierra del Fuego': ['Ushuaia', 'Río Grande', 'Tolhuin'],
      'Tucumán': ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo']
    }
  },
  '56': {
    name: 'Chile',
    code: '+56',
    states: {
      'Arica y Parinacota': ['Arica', 'Putre', 'Camarones'],
      'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte'],
      'Antofagasta': ['Antofagasta', 'Calama', 'Tocopilla'],
      'Atacama': ['Copiapó', 'Vallenar', 'Caldera'],
      'Coquimbo': ['La Serena', 'Coquimbo', 'Ovalle'],
      'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
      'Región Metropolitana de Santiago': ['Santiago', 'Providencia', 'Las Condes'],
      'Libertador General Bernardo O\'Higgins': ['Rancagua', 'San Fernando', 'Santa Cruz'],
      'Maule': ['Talca', 'Curicó', 'Linares'],
      'Ñuble': ['Chillán', 'Bulnes', 'San Carlos'],
      'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
      'La Araucanía': ['Temuco', 'Villarrica', 'Pucón'],
      'Los Ríos': ['Valdivia', 'La Unión', 'Río Bueno'],
      'Los Lagos': ['Puerto Montt', 'Osorno', 'Castro'],
      'Aysén del General Carlos Ibáñez del Campo': ['Coyhaique', 'Puerto Aysén', 'Puerto Chacabuco'],
      'Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Puerto Natales', 'Porvenir']
    }
  },
  '55': {
    name: 'Brasil',
    code: '+55',
    states: {
      'Acre': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
      'Alagoas': ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
      'Amapá': ['Macapá', 'Santana', 'Mazagão'],
      'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara'],
      'Bahía': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
      'Ceará': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
      'Distrito Federal': ['Brasília', 'Ceilândia', 'Taguatinga'],
      'Espírito Santo': ['Vitória', 'Vila Velha', 'Serra'],
      'Goiás': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
      'Maranhão': ['São Luís', 'Imperatriz', 'Timon'],
      'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
      'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas'],
      'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
      'Pará': ['Belém', 'Ananindeua', 'Santarém'],
      'Paraíba': ['João Pessoa', 'Campina Grande', 'Santa Rita'],
      'Paraná': ['Curitiba', 'Londrina', 'Maringá'],
      'Pernambuco': ['Recife', 'Jaboatão dos Guararapes', 'Olinda'],
      'Piauí': ['Teresina', 'Parnaíba', 'Picos'],
      'Río de Janeiro': ['Río de Janeiro', 'São Gonçalo', 'Duque de Caxias'],
      'Río Grande del Norte': ['Natal', 'Mossoró', 'Parnamirim'],
      'Río Grande del Sur': ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
      'Rondônia': ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
      'Roraima': ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
      'Santa Catarina': ['Florianópolis', 'Joinville', 'Blumenau'],
      'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas'],
      'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'],
      'Tocantins': ['Palmas', 'Araguaína', 'Gurupi']
    }
  },
  '593': {
    name: 'Ecuador',
    code: '+593',
    states: {
      'Azuay': ['Cuenca', 'Gualaceo', 'Paute'],
      'Bolívar': ['Guaranda', 'San Miguel', 'Caluma'],
      'Cañar': ['Azogues', 'La Troncal', 'Biblián'],
      'Carchi': ['Tulcán', 'Mira', 'San Gabriel'],
      'Chimborazo': ['Riobamba', 'Guano', 'Colta'],
      'Cotopaxi': ['Latacunga', 'La Maná', 'Pujilí'],
      'El Oro': ['Machala', 'Pasaje', 'Santa Rosa'],
      'Esmeraldas': ['Esmeraldas', 'Atacames', 'Muisne'],
      'Galápagos': ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Puerto Villamil'],
      'Guayas': ['Guayaquil', 'Durán', 'Samborondón'],
      'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi'],
      'Loja': ['Loja', 'Catamayo', 'Zapotillo'],
      'Los Ríos': ['Babahoyo', 'Quevedo', 'Ventanas'],
      'Manabí': ['Portoviejo', 'Manta', 'Montecristi'],
      'Morona Santiago': ['Macas', 'Gualaquiza', 'Sucúa'],
      'Napo': ['Tena', 'El Chaco', 'Archidona'],
      'Orellana': ['Francisco de Orellana', 'La Joya de los Sachas', 'Aguarico'],
      'Pastaza': ['Puyo', 'Mera', 'Santa Clara'],
      'Pichincha': ['Quito', 'Cayambe', 'Mejía'],
      'Santa Elena': ['Santa Elena', 'La Libertad', 'Salinas'],
      'Santo Domingo de los Tsáchilas': ['Santo Domingo', 'La Concordia', 'La Unión'],
      'Sucumbíos': ['Nueva Loja', 'Gonzalo Pizarro', 'Putumayo'],
      'Tungurahua': ['Ambato', 'Baños', 'Pelileo'],
      'Zamora Chinchipe': ['Zamora', 'Yantzaza', 'Centinela del Cóndor']
    }
  },
  '595': {
    name: 'Paraguay',
    code: '+595',
    states: {
      'Alto Paraguay': ['Fuerte Olimpo', 'Bahía Negra'],
      'Alto Paraná': ['Ciudad del Este', 'Hernandarias', 'Minga Guazú'],
      'Amambay': ['Pedro Juan Caballero', 'Bella Vista', 'Capitán Bado'],
      'Boquerón': ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia'],
      'Caaguazú': ['Coronel Oviedo', 'Caaguazú', 'Carayaó'],
      'Caazapá': ['Caazapá', 'Yuty', 'San Juan Nepomuceno'],
      'Canindeyú': ['Salto del Guairá', 'Corpus Christi', 'Ypehú'],
      'Central': ['San Lorenzo', 'Luque', 'Capiatá'],
      'Concepción': ['Concepción', 'Horqueta', 'Belén'],
      'Cordillera': ['Caacupé', 'Eusebio Ayala', 'Piribebuy'],
      'Guairá': ['Villarrica', 'Colón', 'Borja'],
      'Itapúa': ['Encarnación', 'Coronel Bogado', 'Cambyretá'],
      'Misiones': ['San Juan Bautista', 'Ayolas', 'San Ignacio'],
      'Ñeembucú': ['Pilar', 'General Artigas', 'San Pedro del Paraná'],
      'Paraguarí': ['Paraguarí', 'Carapeguá', 'Yaguarón'],
      'Presidente Hayes': ['Villa Hayes', 'Benjamín Aceval', 'Nanawa'],
      'San Pedro': ['San Pedro del Ycuamandiyú', 'Antequera', 'General Isidoro Resquín']
    }
  },
  '598': {
    name: 'Uruguay',
    code: '+598',
    states: {
      'Artigas': ['Artigas', 'Bella Unión', 'Tomás Gomensoro'],
      'Canelones': ['Canelones', 'Santa Lucía', 'Las Piedras'],
      'Cerro Largo': ['Melo', 'Río Branco', 'Aceguá'],
      'Colonia': ['Colonia del Sacramento', 'Carmelo', 'Nueva Helvecia'],
      'Durazno': ['Durazno', 'Sarandí del Yí', 'Blanquillo'],
      'Flores': ['Trinidad', 'Ismael Cortinas', 'Andresito'],
      'Florida': ['Florida', 'Sarandí Grande', 'Casupá'],
      'Lavalleja': ['Minas', 'José Pedro Varela', 'Solís de Mataojo'],
      'Maldonado': ['Maldonado', 'Punta del Este', 'San Carlos'],
      'Montevideo': ['Montevideo', 'Ciudad de la Costa', 'Pando'],
      'Paysandú': ['Paysandú', 'Guichón', 'Quebracho'],
      'Río Negro': ['Fray Bentos', 'Young', 'Nuevo Berlín'],
      'Rivera': ['Rivera', 'Tranqueras', 'Vichadero'],
      'Rocha': ['Rocha', 'Chuy', 'Castillos'],
      'Salto': ['Salto', 'Artigas', 'Constitución'],
      'San José': ['San José de Mayo', 'Libertad', 'Rodríguez'],
      'Soriano': ['Mercedes', 'Dolores', 'Cardona'],
      'Tacuarembó': ['Tacuarembó', 'Paso de los Toros', 'San Gregorio de Polanco'],
      'Treinta y Tres': ['Treinta y Tres', 'Río Branco', 'Vergara']
    }
  },
  '591': {
    name: 'Bolivia',
    code: '+591',
    states: {
      'Chuquisaca': ['Sucre', 'Monteagudo', 'Camargo'],
      'Cochabamba': ['Cochabamba', 'Quillacollo', 'Sacaba'],
      'El Beni': ['Trinidad', 'Riberalta', 'Guayaramerín'],
      'La Paz': ['La Paz', 'El Alto', 'Viacha'],
      'Oruro': ['Oruro', 'Huanuni', 'Challapata'],
      'Pando': ['Cobija', 'Porvenir', 'Bella Flor'],
      'Potosí': ['Potosí', 'Uyuni', 'Tupiza'],
      'Santa Cruz': ['Santa Cruz de la Sierra', 'Montero', 'Warnes'],
      'Tarija': ['Tarija', 'Yacuiba', 'Bermejo']
    }
  },
  '507': {
    name: 'Panamá',
    code: '+507',
    states: {
      'Bocas del Toro': ['Bocas del Toro', 'Changuinola', 'Almirante'],
      'Chiriquí': ['David', 'Boquete', 'Puerto Armuelles'],
      'Coclé': ['Penonomé', 'Aguadulce', 'Natá'],
      'Colón': ['Colón', 'Chagres', 'Portobelo'],
      'Darién': ['La Palma', 'Chepigana', 'Pinogana'],
      'Emberá': ['Unión Chocó', 'Cémaco', 'Sambú'],
      'Herrera': ['Chitré', 'Las Tablas', 'Ocú'],
      'Kuna Yala': ['El Porvenir', 'Narganá', 'Ustupu'],
      'Los Santos': ['Las Tablas', 'Chitré', 'Pedasí'],
      'Ngäbe-Buglé': ['Chichica', 'Kusapín', 'Cerro Punta'],
      'Panamá': ['Panamá', 'San Miguelito', 'Tocumen'],
      'Panamá Oeste': ['La Chorrera', 'Arraiján', 'Capira'],
      'Veraguas': ['Santiago', 'Atalaya', 'San Francisco']
    }
  },
  '506': {
    name: 'Costa Rica',
    code: '+506',
    states: {
      'Alajuela': ['Alajuela', 'San José de Alajuela', 'Atenas'],
      'Cartago': ['Cartago', 'Paraíso', 'Turrialba'],
      'Guanacaste': ['Liberia', 'Nicoya', 'Santa Cruz'],
      'Heredia': ['Heredia', 'San Isidro', 'Barva'],
      'Limón': ['Limón', 'Pococí', 'Siquirres'],
      'Puntarenas': ['Puntarenas', 'Esparza', 'Buenos Aires'],
      'San José': ['San José', 'Desamparados', 'Goicoechea']
    }
  },
  '502': {
    name: 'Guatemala',
    code: '+502',
    states: {
      'Alta Verapaz': ['Cobán', 'San Pedro Carchá', 'San Cristóbal Verapaz'],
      'Baja Verapaz': ['Salamá', 'Cubulco', 'Rabinal'],
      'Chimaltenango': ['Chimaltenango', 'San Martín Jilotepeque', 'Patzún'],
      'Chiquimula': ['Chiquimula', 'Esquipulas', 'Jocotán'],
      'El Progreso': ['Guastatoya', 'San Agustín Acasaguastlán', 'San Antonio La Paz'],
      'Escuintla': ['Escuintla', 'Santa Lucía Cotzumalguapa', 'Tiquisate'],
      'Guatemala': ['Guatemala', 'Villa Nueva', 'Mixco'],
      'Huehuetenango': ['Huehuetenango', 'La Democracia', 'La Libertad'],
      'Izabal': ['Puerto Barrios', 'Livingston', 'El Estor'],
      'Jalapa': ['Jalapa', 'San Pedro Pinula', 'San Luis Jilotepeque'],
      'Jutiapa': ['Jutiapa', 'El Progreso', 'Santa Catarina Mita'],
      'Petén': ['Flores', 'San Benito', 'San Andrés'],
      'Quetzaltenango': ['Quetzaltenango', 'Salcajá', 'Olintepeque'],
      'Quiché': ['Santa Cruz del Quiché', 'Chichicastenango', 'Joyabaj'],
      'Retalhuleu': ['Retalhuleu', 'San Sebastián', 'Champerico'],
      'Sacatepéquez': ['Antigua Guatemala', 'Jocotenango', 'Pastores'],
      'San Marcos': ['San Marcos', 'San Pedro Sacatepéquez', 'Esquipulas Palo Gordo'],
      'Santa Rosa': ['Cuilapa', 'Barberena', 'Chiquimulilla'],
      'Sololá': ['Sololá', 'Panajachel', 'Santiago Atitlán'],
      'Suchitepéquez': ['Mazatenango', 'Cuyotenango', 'San Francisco Zapotitlán'],
      'Totonicapán': ['Totonicapán', 'Momostenango', 'San Cristóbal Totonicapán'],
      'Zacapa': ['Zacapa', 'Estanzuela', 'Río Hondo']
    }
  },
  '503': {
    name: 'El Salvador',
    code: '+503',
    states: {
      'Ahuachapán': ['Ahuachapán', 'Apaneca', 'Atiquizaya'],
      'Cabañas': ['Sensuntepeque', 'Victoria', 'Dolores'],
      'Chalatenango': ['Chalatenango', 'Nueva Concepción', 'La Palma'],
      'Cuscatlán': ['Cojutepeque', 'Suchitoto', 'San Pedro Perulapán'],
      'La Libertad': ['Santa Tecla', 'San Juan Opico', 'Quezaltepeque'],
      'La Paz': ['Zacatecoluca', 'Olocuilta', 'San Pedro Masahuat'],
      'La Unión': ['La Unión', 'Santa Rosa de Lima', 'Pasaquina'],
      'Morazán': ['San Francisco Gotera', 'Chilanga', 'Jocoro'],
      'San Miguel': ['San Miguel', 'Usulután', 'Chinameca'],
      'San Salvador': ['San Salvador', 'Soyapango', 'Mejicanos'],
      'San Vicente': ['San Vicente', 'Verapaz', 'Tecoluca'],
      'Santa Ana': ['Santa Ana', 'Chalchuapa', 'Metapán'],
      'Sonsonate': ['Sonsonate', 'Izalco', 'Acajutla'],
      'Usulután': ['Usulután', 'Jiquilisco', 'Santiago de María']
    }
  },
  '504': {
    name: 'Honduras',
    code: '+504',
    states: {
      'Atlántida': ['La Ceiba', 'Tela', 'El Porvenir'],
      'Choluteca': ['Choluteca', 'San Lorenzo', 'Nacaome'],
      'Colón': ['Trujillo', 'Tocoa', 'Sonaguera'],
      'Comayagua': ['Comayagua', 'Siguatepeque', 'La Libertad'],
      'Copán': ['Santa Rosa de Copán', 'San Pedro Sula', 'La Entrada'],
      'Cortés': ['San Pedro Sula', 'Choloma', 'Puerto Cortés'],
      'El Paraíso': ['Yuscarán', 'Danlí', 'El Paraíso'],
      'Francisco Morazán': ['Tegucigalpa', 'Comayagüela', 'Santa Lucía'],
      'Gracias a Dios': ['Puerto Lempira', 'Brus Laguna', 'Ahuas'],
      'Intibucá': ['La Esperanza', 'Yamaranguila', 'San Juan'],
      'Islas de la Bahía': ['Roatán', 'Utila', 'Guanaja'],
      'La Paz': ['La Paz', 'Marcala', 'Aguanqueterique'],
      'Lempira': ['Gracias', 'Lepaera', 'Erandique'],
      'Ocotepeque': ['Ocotepeque', 'Sensenti', 'San Marcos'],
      'Olancho': ['Juticalpa', 'Catacamas', 'Dulce Nombre de Culmí'],
      'Santa Bárbara': ['Santa Bárbara', 'San Pedro Sula', 'Quimistán'],
      'Valle': ['Nacaome', 'Amapala', 'Langue'],
      'Yoro': ['Yoro', 'El Progreso', 'Olanchito']
    }
  },
  '505': {
    name: 'Nicaragua',
    code: '+505',
    states: {
      'Boaco': ['Boaco', 'Camoapa', 'San José de los Remates'],
      'Carazo': ['Jinotepe', 'Diriamba', 'San Marcos'],
      'Chinandega': ['Chinandega', 'El Viejo', 'Corinto'],
      'Chontales': ['Juigalpa', 'Acoyapa', 'Santo Domingo'],
      'Estelí': ['Estelí', 'Condega', 'La Trinidad'],
      'Granada': ['Granada', 'Nandaime', 'Diría'],
      'Jinotega': ['Jinotega', 'San Rafael del Norte', 'San Sebastián de Yalí'],
      'León': ['León', 'Chinandega', 'El Jicaral'],
      'Madriz': ['Somoto', 'San Lucas', 'Las Sabanas'],
      'Managua': ['Managua', 'Tipitapa', 'San Rafael del Sur'],
      'Masaya': ['Masaya', 'Nindirí', 'Tisma'],
      'Matagalpa': ['Matagalpa', 'Sébaco', 'San Isidro'],
      'Nueva Segovia': ['Ocotal', 'Somoto', 'Jalapa'],
      'Río San Juan': ['San Carlos', 'San Miguelito', 'Morrito'],
      'Rivas': ['Rivas', 'San Jorge', 'San Juan del Sur']
    }
  },
  '501': {
    name: 'Belice',
    code: '+501',
    states: {
      'Belice': ['Belice', 'San Pedro', 'Caye Caulker'],
      'Cayo': ['San Ignacio', 'Benque Viejo del Carmen', 'Santa Elena'],
      'Corozal': ['Corozal', 'Sarteneja', 'Chunox'],
      'Orange Walk': ['Orange Walk', 'San Estevan', 'Trial Farm'],
      'Stann Creek': ['Dangriga', 'Independence', 'Placencia'],
      'Toledo': ['Punta Gorda', 'San Antonio', 'Barranco']
    }
  },
  '995': {
    name: 'Georgia',
    code: '+995',
    states: {
      'Abjasia': ['Sujumi', 'Gagra', 'Gudauta'],
      'Adjaria': ['Batumi', 'Kobuleti', 'Jelva'],
      'Guria': ['Ozurgeti', 'Lanchjuti', 'Chokhatauri'],
      'Imereti': ['Kutaisi', 'Zestafoni', 'Samtredia'],
      'Kajetia': ['Telavi', 'Gurjaani', 'Sagarejo'],
      'Kvemo Kartli': ['Rustavi', 'Bolnisi', 'Gardabani'],
      'Mtsjeta-Mtianeti': ['Mtsjeta', 'Dusheti', 'Kazbegi'],
      'Racha-Lechjumi y Kvemo Svaneti': ['Ambrolauri', 'Oni', 'Tsageri'],
      'Samegrelo-Zemo Svaneti': ['Zugdidi', 'Poti', 'Senaki'],
      'Samtsje-Yavajeti': ['Ajalkalaki', 'Ninotsminda', 'Aspindza'],
      'Shida Kartli': ['Gori', 'Kareli', 'Kaspi'],
      'Tiflis': ['Tiflis', 'Rustavi', 'Gardabani']
    }
  },
  '1': {
    name: 'Estados Unidos',
    code: '+1',
    states: {
      'Alabama': ['Birmingham', 'Montgomery', 'Huntsville'],
      'Alaska': ['Anchorage', 'Fairbanks', 'Juneau'],
      'Arizona': ['Phoenix', 'Tucson', 'Mesa'],
      'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville'],
      'California': ['Los Angeles', 'San Francisco', 'San Diego'],
      'Colorado': ['Denver', 'Colorado Springs', 'Aurora'],
      'Connecticut': ['Bridgeport', 'New Haven', 'Hartford'],
      'Delaware': ['Wilmington', 'Dover', 'Newark'],
      'Florida': ['Miami', 'Orlando', 'Tampa'],
      'Georgia': ['Atlanta', 'Savannah', 'Athens'],
      'Hawaii': ['Honolulu', 'Hilo', 'Kailua'],
      'Idaho': ['Boise', 'Nampa', 'Meridian'],
      'Illinois': ['Chicago', 'Springfield', 'Peoria'],
      'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville'],
      'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport'],
      'Kansas': ['Wichita', 'Kansas City', 'Overland Park'],
      'Kentucky': ['Louisville', 'Lexington', 'Bowling Green'],
      'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport'],
      'Maine': ['Portland', 'Lewiston', 'Bangor'],
      'Maryland': ['Baltimore', 'Annapolis', 'Frederick'],
      'Massachusetts': ['Boston', 'Worcester', 'Springfield'],
      'Michigan': ['Detroit', 'Grand Rapids', 'Warren'],
      'Minnesota': ['Minneapolis', 'Saint Paul', 'Rochester'],
      'Mississippi': ['Jackson', 'Gulfport', 'Biloxi'],
      'Missouri': ['Kansas City', 'St. Louis', 'Springfield'],
      'Montana': ['Billings', 'Missoula', 'Great Falls'],
      'Nebraska': ['Omaha', 'Lincoln', 'Bellevue'],
      'Nevada': ['Las Vegas', 'Reno', 'Carson City'],
      'New Hampshire': ['Manchester', 'Nashua', 'Concord'],
      'New Jersey': ['Newark', 'Jersey City', 'Paterson'],
      'New Mexico': ['Albuquerque', 'Las Cruces', 'Santa Fe'],
      'New York': ['New York City', 'Buffalo', 'Rochester'],
      'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro'],
      'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks'],
      'Ohio': ['Columbus', 'Cleveland', 'Cincinnati'],
      'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman'],
      'Oregon': ['Portland', 'Salem', 'Eugene'],
      'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown'],
      'Rhode Island': ['Providence', 'Warwick', 'Cranston'],
      'South Carolina': ['Columbia', 'Charleston', 'Greenville'],
      'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen'],
      'Tennessee': ['Nashville', 'Memphis', 'Knoxville'],
      'Texas': ['Houston', 'San Antonio', 'Dallas'],
      'Utah': ['Salt Lake City', 'West Valley City', 'Provo'],
      'Vermont': ['Burlington', 'Montpelier', 'Rutland'],
      'Virginia': ['Virginia Beach', 'Richmond', 'Arlington'],
      'Washington': ['Seattle', 'Spokane', 'Tacoma'],
      'West Virginia': ['Charleston', 'Huntington', 'Morgantown'],
      'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay'],
      'Wyoming': ['Cheyenne', 'Casper', 'Laramie']
    }
  },
  // Canadá
  '1_ca': {
    name: 'Canadá',
    code: '+1',
    states: {
      'Alberta': ['Calgary', 'Edmonton', 'Red Deer'],
      'Columbia Británica': ['Vancouver', 'Victoria', 'Surrey'],
      'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach'],
      'Nueva Brunswick': ['Saint John', 'Moncton', 'Fredericton'],
      'Terranova y Labrador': ['St. John\'s', 'Mount Pearl', 'Corner Brook'],
      'Nueva Escocia': ['Halifax', 'Sydney', 'Dartmouth'],
      'Ontario': ['Toronto', 'Ottawa', 'Mississauga'],
      'Isla del Príncipe Eduardo': ['Charlottetown', 'Summerside'],
      'Quebec': ['Montreal', 'Quebec', 'Laval'],
      'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert'],
      'Territorios del Noroeste': ['Yellowknife', 'Hay River', 'Inuvik'],
      'Nunavut': ['Iqaluit', 'Rankin Inlet', 'Arviat'],
      'Yukón': ['Whitehorse', 'Dawson City', 'Watson Lake']
    }
  },
  // Europa
  '34': {
    name: 'España',
    code: '+34',
    states: {
      'Andalucía': ['Sevilla', 'Málaga', 'Córdoba'],
      'Aragón': ['Zaragoza', 'Huesca', 'Teruel'],
      'Asturias': ['Oviedo', 'Gijón', 'Avilés'],
      'Baleares': ['Palma de Mallorca', 'Ibiza', 'Mahón'],
      'Canarias': ['Las Palmas', 'Santa Cruz de Tenerife', 'Telde'],
      'Cantabria': ['Santander', 'Torrelavega', 'Castro Urdiales'],
      'Castilla-La Mancha': ['Toledo', 'Albacete', 'Guadalajara'],
      'Castilla y León': ['Valladolid', 'León', 'Burgos'],
      'Cataluña': ['Barcelona', 'Girona', 'Lleida'],
      'Extremadura': ['Mérida', 'Badajoz', 'Cáceres'],
      'Galicia': ['Santiago de Compostela', 'Vigo', 'A Coruña'],
      'La Rioja': ['Logroño', 'Calahorra', 'Arnedo'],
      'Madrid': ['Madrid', 'Móstoles', 'Alcalá de Henares'],
      'Murcia': ['Murcia', 'Cartagena', 'Lorca'],
      'Navarra': ['Pamplona', 'Tudela', 'Estella'],
      'País Vasco': ['Bilbao', 'Vitoria-Gasteiz', 'San Sebastián'],
      'Valencia': ['Valencia', 'Alicante', 'Elche'],
      'Ceuta': ['Ceuta'],
      'Melilla': ['Melilla']
    }
  },
  '33': {
    name: 'Francia',
    code: '+33',
    states: {
      'Auvernia-Ródano-Alpes': ['Lyon', 'Grenoble', 'Saint-Étienne'],
      'Borgoña-Franco Condado': ['Dijon', 'Besançon', 'Belfort'],
      'Bretaña': ['Rennes', 'Brest', 'Quimper'],
      'Centro-Valle del Loira': ['Tours', 'Orléans', 'Blois'],
      'Córcega': ['Ajaccio', 'Bastia', 'Porto-Vecchio'],
      'Gran Este': ['Estrasburgo', 'Nancy', 'Metz'],
      'Isla de Francia': ['París', 'Versalles', 'Saint-Denis'],
      'Normandía': ['Ruan', 'Le Havre', 'Caen'],
      'Nueva Aquitania': ['Burdeos', 'Limoges', 'Poitiers'],
      'Occitania': ['Toulouse', 'Montpellier', 'Nimes'],
      'País del Loira': ['Nantes', 'Angers', 'Le Mans'],
      'Provenza-Alpes-Costa Azul': ['Marsella', 'Niza', 'Toulon']
    }
  },
  '49': {
    name: 'Alemania',
    code: '+49',
    states: {
      'Baden-Wurtemberg': ['Stuttgart', 'Karlsruhe', 'Mannheim'],
      'Baviera': ['Múnich', 'Núremberg', 'Augsburgo'],
      'Berlín': ['Berlín'],
      'Brandeburgo': ['Potsdam', 'Cottbus', 'Brandeburgo'],
      'Bremen': ['Bremen', 'Bremerhaven'],
      'Hamburgo': ['Hamburgo'],
      'Hesse': ['Fráncfort', 'Wiesbaden', 'Kassel'],
      'Mecklemburgo-Pomerania Occidental': ['Schwerin', 'Rostock', 'Stralsund'],
      'Baja Sajonia': ['Hannover', 'Brunswick', 'Osnabrück'],
      'Renania del Norte-Westfalia': ['Düsseldorf', 'Colonia', 'Dortmund'],
      'Renania-Palatinado': ['Maguncia', 'Ludwigshafen', 'Kaiserslautern'],
      'Sarre': ['Saarbrücken', 'Neunkirchen', 'Homburg'],
      'Sajonia': ['Dresde', 'Leipzig', 'Chemnitz'],
      'Sajonia-Anhalt': ['Magdeburgo', 'Halle', 'Dessau'],
      'Schleswig-Holstein': ['Kiel', 'Lübeck', 'Flensburgo'],
      'Turingia': ['Erfurt', 'Jena', 'Gera']
    }
  },
  '39': {
    name: 'Italia',
    code: '+39',
    states: {
      'Abruzos': ['L\'Aquila', 'Pescara', 'Chieti'],
      'Basilicata': ['Potenza', 'Matera'],
      'Calabria': ['Reggio Calabria', 'Catanzaro', 'Cosenza'],
      'Campania': ['Nápoles', 'Salerno', 'Caserta'],
      'Emilia-Romaña': ['Bolonia', 'Parma', 'Módena'],
      'Friuli-Venecia Julia': ['Trieste', 'Udine', 'Pordenone'],
      'Lacio': ['Roma', 'Latina', 'Frosinone'],
      'Liguria': ['Génova', 'La Spezia', 'Savona'],
      'Lombardía': ['Milán', 'Bérgamo', 'Brescia'],
      'Marcas': ['Ancona', 'Pesaro', 'Urbino'],
      'Molise': ['Campobasso', 'Termoli'],
      'Piamonte': ['Turín', 'Novara', 'Alessandria'],
      'Puglia': ['Bari', 'Taranto', 'Foggia'],
      'Sardegna': ['Cagliari', 'Sassari', 'Nuoro'],
      'Sicilia': ['Palermo', 'Catania', 'Mesina'],
      'Toscana': ['Florencia', 'Pisa', 'Siena'],
      'Trentino-Alto Adigio': ['Trento', 'Bolzano'],
      'Umbría': ['Perugia', 'Terni'],
      'Valle de Aosta': ['Aosta'],
      'Véneto': ['Venecia', 'Verona', 'Padua']
    }
  },
  '44': {
    name: 'Reino Unido',
    code: '+44',
    states: {
      'Inglaterra': ['Londres', 'Manchester', 'Birmingham'],
      'Escocia': ['Edimburgo', 'Glasgow', 'Aberdeen'],
      'Gales': ['Cardiff', 'Swansea', 'Newport'],
      'Irlanda del Norte': ['Belfast', 'Derry', 'Lisburn']
    }
  },
  // Asia
  '86': {
    name: 'China',
    code: '+86',
    states: {
      'Beijing': ['Beijing'],
      'Shanghai': ['Shanghai'],
      'Guangdong': ['Guangzhou', 'Shenzhen', 'Dongguan'],
      'Jiangsu': ['Nanjing', 'Suzhou', 'Wuxi'],
      'Zhejiang': ['Hangzhou', 'Ningbo', 'Wenzhou'],
      'Shandong': ['Jinan', 'Qingdao', 'Yantai'],
      'Henan': ['Zhengzhou', 'Luoyang', 'Kaifeng'],
      'Sichuan': ['Chengdu', 'Mianyang', 'Nanchong'],
      'Hubei': ['Wuhan', 'Yichang', 'Xiangyang'],
      'Hunan': ['Changsha', 'Zhuzhou', 'Xiangtan'],
      'Fujian': ['Fuzhou', 'Xiamen', 'Quanzhou'],
      'Anhui': ['Hefei', 'Wuhu', 'Bengbu'],
      'Hebei': ['Shijiazhuang', 'Tangshan', 'Qinhuangdao'],
      'Liaoning': ['Shenyang', 'Dalian', 'Anshan'],
      'Jilin': ['Changchun', 'Jilin', 'Siping'],
      'Heilongjiang': ['Harbin', 'Qiqihar', 'Mudanjiang'],
      'Shaanxi': ['Xi\'an', 'Baoji', 'Xianyang'],
      'Shanxi': ['Taiyuan', 'Datong', 'Yangquan'],
      'Gansu': ['Lanzhou', 'Jiayuguan', 'Jinchang'],
      'Qinghai': ['Xining', 'Haidong', 'Hainan'],
      'Yunnan': ['Kunming', 'Qujing', 'Yuxi'],
      'Guizhou': ['Guiyang', 'Zunyi', 'Anshun'],
      'Guangxi': ['Nanning', 'Liuzhou', 'Guilin'],
      'Hainan': ['Haikou', 'Sanya', 'Danzhou'],
      'Xinjiang': ['Ürümqi', 'Karamay', 'Shihezi'],
      'Xizang': ['Lhasa', 'Shigatse', 'Qamdo'],
      'Nei Mongol': ['Hohhot', 'Baotou', 'Ordos'],
      'Ningxia': ['Yinchuan', 'Shizuishan', 'Wuzhong'],
      'Tianjin': ['Tianjin'],
      'Chongqing': ['Chongqing']
    }
  },
  '81': {
    name: 'Japón',
    code: '+81',
    states: {
      'Tokyo': ['Tokyo', 'Shinjuku', 'Shibuya'],
      'Osaka': ['Osaka', 'Sakai', 'Higashiosaka'],
      'Kanagawa': ['Yokohama', 'Kawasaki', 'Sagamihara'],
      'Aichi': ['Nagoya', 'Toyota', 'Toyohashi'],
      'Hokkaido': ['Sapporo', 'Asahikawa', 'Hakodate'],
      'Fukuoka': ['Fukuoka', 'Kitakyushu', 'Kurume'],
      'Hyogo': ['Kobe', 'Himeji', 'Nishinomiya'],
      'Kyoto': ['Kyoto', 'Uji', 'Kameoka'],
      'Saitama': ['Saitama', 'Kawagoe', 'Kumagaya'],
      'Chiba': ['Chiba', 'Funabashi', 'Matsudo'],
      'Hiroshima': ['Hiroshima', 'Fukuyama', 'Kure'],
      'Miyagi': ['Sendai', 'Ishinomaki', 'Tagajo'],
      'Niigata': ['Niigata', 'Nagaoka', 'Joetsu'],
      'Kumamoto': ['Kumamoto', 'Yatsushiro', 'Tamana'],
      'Okinawa': ['Naha', 'Okinawa', 'Uruma'],
      'Shizuoka': ['Shizuoka', 'Hamamatsu', 'Fuji'],
      'Ibaraki': ['Mito', 'Tsukuba', 'Hitachi'],
      'Tochigi': ['Utsunomiya', 'Ashikaga', 'Tochigi'],
      'Gunma': ['Maebashi', 'Takasaki', 'Kiryu'],
      'Saitama': ['Saitama', 'Kawagoe', 'Kumagaya'],
      'Chiba': ['Chiba', 'Funabashi', 'Matsudo'],
      'Tokyo': ['Tokyo', 'Shinjuku', 'Shibuya'],
      'Kanagawa': ['Yokohama', 'Kawasaki', 'Sagamihara'],
      'Yamanashi': ['Kofu', 'Fujiyoshida', 'Tsuru'],
      'Nagano': ['Nagano', 'Matsumoto', 'Ueda'],
      'Gifu': ['Gifu', 'Ogaki', 'Tajimi'],
      'Shiga': ['Otsu', 'Hikone', 'Kusatsu'],
      'Mie': ['Tsu', 'Yokkaichi', 'Matsusaka'],
      'Wakayama': ['Wakayama', 'Tanabe', 'Hashimoto'],
      'Nara': ['Nara', 'Kashihara', 'Ikoma'],
      'Kyoto': ['Kyoto', 'Uji', 'Kameoka'],
      'Osaka': ['Osaka', 'Sakai', 'Higashiosaka'],
      'Hyogo': ['Kobe', 'Himeji', 'Nishinomiya'],
      'Tottori': ['Tottori', 'Yonago', 'Kurayoshi'],
      'Shimane': ['Matsue', 'Izumo', 'Masuda'],
      'Okayama': ['Okayama', 'Kurashiki', 'Tsuyama'],
      'Hiroshima': ['Hiroshima', 'Fukuyama', 'Kure'],
      'Yamaguchi': ['Shimonoseki', 'Ube', 'Yamaguchi'],
      'Tokushima': ['Tokushima', 'Anan', 'Komatsushima'],
      'Kagawa': ['Takamatsu', 'Marugame', 'Sakaide'],
      'Ehime': ['Matsuyama', 'Imabari', 'Uwajima'],
      'Kochi': ['Kochi', 'Sukumo', 'Aki'],
      'Fukuoka': ['Fukuoka', 'Kitakyushu', 'Kurume'],
      'Saga': ['Saga', 'Karatsu', 'Tosu'],
      'Nagasaki': ['Nagasaki', 'Sasebo', 'Isahaya'],
      'Kumamoto': ['Kumamoto', 'Yatsushiro', 'Tamana'],
      'Oita': ['Oita', 'Beppu', 'Nakatsu'],
      'Miyazaki': ['Miyazaki', 'Miyakonojo', 'Nobeoka'],
      'Kagoshima': ['Kagoshima', 'Kirishima', 'Kanoya'],
      'Okinawa': ['Naha', 'Okinawa', 'Uruma']
    }
  },
  '91': {
    name: 'India',
    code: '+91',
    states: {
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
      'Delhi': ['Nueva Delhi', 'Delhi'],
      'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
      'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
      'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
      'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra'],
      'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
      'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota'],
      'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
      'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
      'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
      'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
      'Haryana': ['Gurgaon', 'Faridabad', 'Panipat'],
      'Bihar': ['Patna', 'Gaya', 'Bhagalpur'],
      'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela'],
      'Assam': ['Guwahati', 'Silchar', 'Dibrugarh'],
      'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
      'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur'],
      'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee'],
      'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan'],
      'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
      'Manipur': ['Imphal', 'Thoubal', 'Bishnupur'],
      'Meghalaya': ['Shillong', 'Tura', 'Jowai'],
      'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
      'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
      'Mizoram': ['Aizawl', 'Lunglei', 'Saiha'],
      'Sikkim': ['Gangtok', 'Namchi', 'Mangan'],
      'Goa': ['Panaji', 'Margao', 'Mapusa']
    }
  },
  '82': {
    name: 'Corea del Sur',
    code: '+82',
    states: {
      'Seúl': ['Seúl', 'Gangnam', 'Mapo'],
      'Busan': ['Busan', 'Haeundae', 'Sasang'],
      'Daegu': ['Daegu', 'Suseong', 'Dalseo'],
      'Incheon': ['Incheon', 'Bupyeong', 'Namdong'],
      'Gwangju': ['Gwangju', 'Seo', 'Nam'],
      'Daejeon': ['Daejeon', 'Yuseong', 'Seo'],
      'Ulsan': ['Ulsan', 'Nam', 'Buk'],
      'Gyeonggi': ['Suwon', 'Seongnam', 'Bucheon'],
      'Gangwon': ['Chuncheon', 'Wonju', 'Gangneung'],
      'Chungcheong del Norte': ['Cheongju', 'Jeonju', 'Chungju'],
      'Chungcheong del Sur': ['Daejeon', 'Cheonan', 'Asan'],
      'Jeolla del Norte': ['Jeonju', 'Gunsan', 'Iksan'],
      'Jeolla del Sur': ['Gwangju', 'Mokpo', 'Yeosu'],
      'Gyeongsang del Norte': ['Daegu', 'Pohang', 'Gumi'],
      'Gyeongsang del Sur': ['Busan', 'Changwon', 'Jinju'],
      'Jeju': ['Jeju', 'Seogwipo', 'Jeju-si']
    }
  },
  // Oceanía
  '61': {
    name: 'Australia',
    code: '+61',
    states: {
      'Nueva Gales del Sur': ['Sídney', 'Newcastle', 'Wollongong'],
      'Victoria': ['Melbourne', 'Geelong', 'Ballarat'],
      'Queensland': ['Brisbane', 'Gold Coast', 'Townsville'],
      'Australia Occidental': ['Perth', 'Fremantle', 'Rockingham'],
      'Australia Meridional': ['Adelaida', 'Mount Gambier', 'Whyalla'],
      'Tasmania': ['Hobart', 'Launceston', 'Devonport'],
      'Territorio del Norte': ['Darwin', 'Alice Springs', 'Palmerston'],
      'Territorio de la Capital Australiana': ['Canberra', 'Belconnen', 'Woden']
    }
  },
  '64': {
    name: 'Nueva Zelanda',
    code: '+64',
    states: {
      'Auckland': ['Auckland', 'Manukau', 'North Shore'],
      'Wellington': ['Wellington', 'Lower Hutt', 'Upper Hutt'],
      'Canterbury': ['Christchurch', 'Timaru', 'Ashburton'],
      'Waikato': ['Hamilton', 'Tauranga', 'Rotorua'],
      'Bay of Plenty': ['Tauranga', 'Rotorua', 'Whakatane'],
      'Manawatu-Wanganui': ['Palmerston North', 'Whanganui', 'Levin'],
      'Otago': ['Dunedin', 'Invercargill', 'Queenstown'],
      'Hawke\'s Bay': ['Napier', 'Hastings', 'Gisborne'],
      'Taranaki': ['New Plymouth', 'Hawera', 'Stratford'],
      'Southland': ['Invercargill', 'Gore', 'Te Anau'],
      'Northland': ['Whangarei', 'Kerikeri', 'Kaitaia'],
      'Marlborough': ['Blenheim', 'Picton', 'Kaikoura'],
      'Nelson': ['Nelson', 'Richmond', 'Motueka'],
      'Westland': ['Greymouth', 'Hokitika', 'Westport'],
      'Gisborne': ['Gisborne', 'Tolaga Bay', 'Te Karaka']
    }
  },
  // Más países de Europa
  '31': {
    name: 'Países Bajos',
    code: '+31',
    states: {
      'Holanda del Norte': ['Ámsterdam', 'Haarlem', 'Zaandam'],
      'Holanda del Sur': ['La Haya', 'Róterdam', 'Leiden'],
      'Utrecht': ['Utrecht', 'Amersfoort', 'Nieuwegein'],
      'Gelderland': ['Arnhem', 'Nijmegen', 'Apeldoorn'],
      'Limburgo': ['Maastricht', 'Venlo', 'Roermond'],
      'Brabante del Norte': ['Eindhoven', 'Tilburg', 'Breda'],
      'Overijssel': ['Zwolle', 'Enschede', 'Deventer'],
      'Drenthe': ['Assen', 'Emmen', 'Hoogeveen'],
      'Groninga': ['Groninga', 'Delfzijl', 'Stadskanaal'],
      'Frisia': ['Leeuwarden', 'Sneek', 'Drachten'],
      'Flevoland': ['Almere', 'Lelystad', 'Emmeloord'],
      'Zeelandia': ['Middelburg', 'Vlissingen', 'Terneuzen']
    }
  },
  '46': {
    name: 'Suecia',
    code: '+46',
    states: {
      'Estocolmo': ['Estocolmo', 'Sollentuna', 'Huddinge'],
      'Västra Götaland': ['Gotemburgo', 'Malmö', 'Borås'],
      'Skåne': ['Malmö', 'Helsingborg', 'Lund'],
      'Uppsala': ['Uppsala', 'Enköping', 'Älvkarleby'],
      'Östergötland': ['Linköping', 'Norrköping', 'Motala'],
      'Jönköping': ['Jönköping', 'Växjö', 'Huskvarna'],
      'Kronoberg': ['Växjö', 'Ljungby', 'Älmhult'],
      'Kalmar': ['Kalmar', 'Västervik', 'Oskarshamn'],
      'Gotland': ['Visby', 'Roma', 'Slite'],
      'Blekinge': ['Karlskrona', 'Karlshamn', 'Ronneby'],
      'Halland': ['Halmstad', 'Varberg', 'Falkenberg'],
      'Värmland': ['Karlstad', 'Kristinehamn', 'Arvika'],
      'Örebro': ['Örebro', 'Karlskoga', 'Kumla'],
      'Västmanland': ['Västerås', 'Eskilstuna', 'Kungsör'],
      'Dalarna': ['Falun', 'Borlänge', 'Ludvika'],
      'Gävleborg': ['Gävle', 'Sandviken', 'Bollnäs'],
      'Västernorrland': ['Sundsvall', 'Örnsköldsvik', 'Härnösand'],
      'Jämtland': ['Östersund', 'Strömsund', 'Ragunda'],
      'Västerbotten': ['Umeå', 'Skellefteå', 'Lycksele'],
      'Norrbotten': ['Luleå', 'Piteå', 'Kiruna']
    }
  },
  '47': {
    name: 'Noruega',
    code: '+47',
    states: {
      'Oslo': ['Oslo', 'Drammen', 'Asker'],
      'Viken': ['Drammen', 'Moss', 'Fredrikstad'],
      'Innlandet': ['Hamar', 'Lillehammer', 'Kongsberg'],
      'Vestfold og Telemark': ['Tønsberg', 'Sandefjord', 'Skien'],
      'Agder': ['Kristiansand', 'Arendal', 'Grimstad'],
      'Rogaland': ['Stavanger', 'Haugesund', 'Sandnes'],
      'Vestland': ['Bergen', 'Stord', 'Leirvik'],
      'Møre og Romsdal': ['Ålesund', 'Kristiansund', 'Molde'],
      'Trøndelag': ['Trondheim', 'Steinkjer', 'Levanger'],
      'Nordland': ['Bodø', 'Narvik', 'Mo i Rana'],
      'Troms og Finnmark': ['Tromsø', 'Alta', 'Vadsø']
    }
  },
  '45': {
    name: 'Dinamarca',
    code: '+45',
    states: {
      'Hovedstaden': ['Copenhague', 'Frederiksberg', 'Gentofte'],
      'Sjælland': ['Roskilde', 'Køge', 'Næstved'],
      'Syddanmark': ['Odense', 'Esbjerg', 'Kolding'],
      'Midtjylland': ['Aarhus', 'Randers', 'Silkeborg'],
      'Nordjylland': ['Aalborg', 'Viborg', 'Hjørring']
    }
  },
  '358': {
    name: 'Finlandia',
    code: '+358',
    states: {
      'Uusimaa': ['Helsinki', 'Espoo', 'Vantaa'],
      'Varsinais-Suomi': ['Turku', 'Kaarina', 'Raisio'],
      'Pirkanmaa': ['Tampere', 'Pori', 'Nokia'],
      'Päijät-Häme': ['Lahti', 'Hollola', 'Nastola'],
      'Kanta-Häme': ['Hämeenlinna', 'Forssa', 'Riihimäki'],
      'Kymenlaakso': ['Kotka', 'Kouvola', 'Lappeenranta'],
      'Etelä-Karjala': ['Lappeenranta', 'Imatra', 'Joutseno'],
      'Etelä-Savo': ['Mikkeli', 'Pieksämäki', 'Savonlinna'],
      'Pohjois-Savo': ['Kuopio', 'Iisalmi', 'Siilinjärvi'],
      'Pohjois-Karjala': ['Joensuu', 'Kitee', 'Outokumpu'],
      'Keski-Suomi': ['Jyväskylä', 'Jämsä', 'Äänekoski'],
      'Etelä-Pohjanmaa': ['Seinäjoki', 'Vaasa', 'Kokkola'],
      'Pohjanmaa': ['Vaasa', 'Kokkola', 'Pietarsaari'],
      'Keski-Pohjanmaa': ['Kokkola', 'Ylivieska', 'Kannus'],
      'Pohjois-Pohjanmaa': ['Oulu', 'Raahe', 'Kempele'],
      'Kainuu': ['Kajaani', 'Kuhmo', 'Sotkamo'],
      'Lappi': ['Rovaniemi', 'Tornio', 'Kemi']
    }
  },
  // Más países de Asia
  '65': {
    name: 'Singapur',
    code: '+65',
    states: {
      'Central': ['Bishan', 'Bukit Merah', 'Bukit Timah'],
      'East': ['Bedok', 'Changi', 'Pasir Ris'],
      'North': ['Admiralty', 'Kranji', 'Woodlands'],
      'North-East': ['Ang Mo Kio', 'Hougang', 'Punggol'],
      'West': ['Boon Lay', 'Clementi', 'Jurong'],
      'Central': ['Bishan', 'Bukit Merah', 'Bukit Timah'],
      'East': ['Bedok', 'Changi', 'Pasir Ris'],
      'North': ['Admiralty', 'Kranji', 'Woodlands'],
      'North-East': ['Ang Mo Kio', 'Hougang', 'Punggol'],
      'West': ['Boon Lay', 'Clementi', 'Jurong']
    }
  },
  '66': {
    name: 'Tailandia',
    code: '+66',
    states: {
      'Bangkok': ['Bangkok', 'Thonburi', 'Dusit'],
      'Chiang Mai': ['Chiang Mai', 'Lamphun', 'Lampang'],
      'Chiang Rai': ['Chiang Rai', 'Mae Sai', 'Chiang Saen'],
      'Phuket': ['Phuket', 'Patong', 'Karon'],
      'Pattaya': ['Pattaya', 'Jomtien', 'Naklua'],
      'Ayutthaya': ['Ayutthaya', 'Bang Pa-in', 'Bang Sai'],
      'Kanchanaburi': ['Kanchanaburi', 'Sai Yok', 'Erawan'],
      'Krabi': ['Krabi', 'Ao Nang', 'Railay'],
      'Surat Thani': ['Surat Thani', 'Koh Samui', 'Koh Phangan'],
      'Songkhla': ['Songkhla', 'Hat Yai', 'Sadao']
    }
  },
  '84': {
    name: 'Vietnam',
    code: '+84',
    states: {
      'Hanoi': ['Hanoi', 'Ha Dong', 'Soc Son'],
      'Ho Chi Minh': ['Ho Chi Minh', 'Thu Duc', 'Cu Chi'],
      'Da Nang': ['Da Nang', 'Hoi An', 'My Son'],
      'Hai Phong': ['Hai Phong', 'Cat Ba', 'Do Son'],
      'Can Tho': ['Can Tho', 'Cai Rang', 'Thot Not'],
      'Hue': ['Hue', 'Phu Bai', 'Thuan An'],
      'Nha Trang': ['Nha Trang', 'Cam Ranh', 'Ninh Hoa'],
      'Vung Tau': ['Vung Tau', 'Ba Ria', 'Long Hai'],
      'Dalat': ['Dalat', 'Bao Loc', 'Don Duong'],
      'Sapa': ['Sapa', 'Lao Cai', 'Bac Ha']
    }
  },
  '60': {
    name: 'Malasia',
    code: '+60',
    states: {
      'Selangor': ['Shah Alam', 'Petaling Jaya', 'Subang Jaya'],
      'Kuala Lumpur': ['Kuala Lumpur', 'Ampang', 'Cheras'],
      'Penang': ['George Town', 'Butterworth', 'Bayan Lepas'],
      'Johor': ['Johor Bahru', 'Iskandar Puteri', 'Pasir Gudang'],
      'Perak': ['Ipoh', 'Taiping', 'Lumut'],
      'Negeri Sembilan': ['Seremban', 'Nilai', 'Port Dickson'],
      'Melaka': ['Melaka', 'Alor Gajah', 'Jasin'],
      'Pahang': ['Kuantan', 'Temerloh', 'Bentong'],
      'Terengganu': ['Kuala Terengganu', 'Kemaman', 'Dungun'],
      'Kelantan': ['Kota Bharu', 'Tumpat', 'Pasir Mas']
    }
  },
  '971': {
    name: 'Emiratos Árabes Unidos',
    code: '+971',
    states: {
      'Dubai': ['Dubai', 'Deira', 'Bur Dubai'],
      'Abu Dhabi': ['Abu Dhabi', 'Al Ain', 'Liwa'],
      'Sharjah': ['Sharjah', 'Khor Fakkan', 'Kalba'],
      'Ajman': ['Ajman', 'Al Manama', 'Masfut'],
      'Umm Al Quwain': ['Umm Al Quwain', 'Falaj Al Mualla'],
      'Ras Al Khaimah': ['Ras Al Khaimah', 'Al Rams', 'Al Jazirah Al Hamra'],
      'Fujairah': ['Fujairah', 'Dibba Al Fujairah', 'Khor Fakkan']
    }
  },
  '966': {
    name: 'Arabia Saudita',
    code: '+966',
    states: {
      'Riyadh': ['Riyadh', 'Diriyah', 'Al Kharj'],
      'Jeddah': ['Jeddah', 'Makkah', 'Taif'],
      'Dammam': ['Dammam', 'Al Khobar', 'Dhahran'],
      'Medina': ['Medina', 'Yanbu', 'Tabuk'],
      'Abha': ['Abha', 'Khamis Mushait', 'Najran'],
      'Jizan': ['Jizan', 'Abu Arish', 'Sabya'],
      'Tabuk': ['Tabuk', 'Al Wajh', 'Duba'],
      'Hail': ['Hail', 'Buraidah', 'Unaizah'],
      'Qassim': ['Buraidah', 'Unaizah', 'Riyadh Al Khabra'],
      'Asir': ['Abha', 'Khamis Mushait', 'Najran']
    }
  },
  '20': {
    name: 'Egipto',
    code: '+20',
    states: {
      'El Cairo': ['El Cairo', 'Giza', 'Helwan'],
      'Alejandría': ['Alejandría', 'Borg El Arab', 'Abu Qir'],
      'Giza': ['Giza', '6 de Octubre', 'Sheikh Zayed'],
      'Sharm El Sheikh': ['Sharm El Sheikh', 'Dahab', 'Nuweiba'],
      'Luxor': ['Luxor', 'Karnak', 'Valle de los Reyes'],
      'Asuán': ['Asuán', 'Kom Ombo', 'Edfu'],
      'Hurghada': ['Hurghada', 'El Gouna', 'Safaga'],
      'Marsa Alam': ['Marsa Alam', 'Port Ghalib', 'El Quseir'],
      'Siwa': ['Siwa', 'Bahariya', 'Farafra'],
      'Dahab': ['Dahab', 'Nuweiba', 'Taba']
    }
  },
  '27': {
    name: 'Sudáfrica',
    code: '+27',
    states: {
      'Gauteng': ['Johannesburgo', 'Pretoria', 'Centurion'],
      'Western Cape': ['Ciudad del Cabo', 'Stellenbosch', 'Paarl'],
      'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Ballito'],
      'Eastern Cape': ['Port Elizabeth', 'East London', 'Grahamstown'],
      'Free State': ['Bloemfontein', 'Welkom', 'Kroonstad'],
      'Mpumalanga': ['Nelspruit', 'Witbank', 'Secunda'],
      'Limpopo': ['Polokwane', 'Tzaneen', 'Thohoyandou'],
      'North West': ['Rustenburg', 'Mahikeng', 'Potchefstroom'],
      'Northern Cape': ['Kimberley', 'Upington', 'Springbok']
    }
  },
  '234': {
    name: 'Nigeria',
    code: '+234',
    states: {
      'Lagos': ['Lagos', 'Ikeja', 'Victoria Island'],
      'Kano': ['Kano', 'Fagge', 'Ungogo'],
      'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Okrika'],
      'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan'],
      'Katsina': ['Katsina', 'Daura', 'Funtua'],
      'Oyo': ['Ibadan', 'Ogbomoso', 'Oyo'],
      'Imo': ['Owerri', 'Okigwe', 'Orlu'],
      'Borno': ['Maiduguri', 'Bama', 'Dikwa'],
      'Anambra': ['Awka', 'Onitsha', 'Nnewi'],
      'Sokoto': ['Sokoto', 'Tambuwal', 'Wamako']
    }
  },
  '254': {
    name: 'Kenia',
    code: '+254',
    states: {
      'Nairobi': ['Nairobi', 'Westlands', 'Kilimani'],
      'Mombasa': ['Mombasa', 'Nyali', 'Bamburi'],
      'Kisumu': ['Kisumu', 'Kisii', 'Migori'],
      'Nakuru': ['Nakuru', 'Naivasha', 'Gilgil'],
      'Eldoret': ['Eldoret', 'Uasin Gishu', 'Nandi'],
      'Thika': ['Thika', 'Juja', 'Ruiru'],
      'Malindi': ['Malindi', 'Watamu', 'Lamu'],
      'Kakamega': ['Kakamega', 'Bungoma', 'Busia'],
      'Nyeri': ['Nyeri', 'Karatina', 'Othaya'],
      'Machakos': ['Machakos', 'Athi River', 'Tala']
    }
  }
};

// Función para obtener país por código numérico
export const getCountryByCode = (code) => {
  const cleanCode = typeof code === 'string' ? code.replace('+', '') : code;
  return countryMap[cleanCode] || null;
};

// Función para obtener estados de un país
export const getStatesByCountry = (countryCode) => {
  const country = getCountryByCode(countryCode);
  return country ? Object.keys(country.states) : [];
};

// Función para obtener ciudades de un estado
export const getCitiesByState = (countryCode, state) => {
  const country = getCountryByCode(countryCode);
  return country && country.states[state] ? country.states[state] : [];
};

// Función para obtener información completa del país
export const getCountryInfo = (countryCode) => {
  const country = getCountryByCode(countryCode);
  if (!country) return null;
  
  return {
    name: country.name,
    code: country.code,
    states: Object.keys(country.states)
  };
}; 