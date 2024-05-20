'use client' 

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from './HomePage.module.css';
import logoBranco from '../../public/img/logos/versao_1_branco.png';
import logoPreto from '../../public/img/logos/versao_2_preto.png';
import imgFogrete from '../../public/img/fundos/spaceship5 1.png';
import imgFundo from '../../public/img/fundos/creative-mars-collage 1.png';
import filmIcon from '../../public/img/icons/Group_3568.svg';
import planetMock from '../../public/img/planetas/kashyyyk 1.png';
import Api from '../../src/app/axiosConfig';

//Imagens Planets 

import Naboo from "../../public/img/planetas/planeta_0001_naboo.png";
import Mustafar from "../../public/img/planetas/planeta_0002_mustafar.png";
import Kashyyyk from "../../public/img/planetas/planeta_0003_kashyyyk.png";
import Noth from "../../public/img/planetas/planeta_0004_hoth.png";
import Endor from "../../public/img/planetas/planeta_0005_endor.png";
import Dagobah from "../../public/img/planetas/planeta_0006_dagobah.png";
import Coruscant from "../../public/img/planetas/planeta_0007_coruscant.png";
import Bespin from "../../public/img/planetas/planeta_0008_bespin.png";
import Alderaan from "../../public/img/planetas/planeta_0009_alderaan.png";
import Tatooine from "../../public/img/planetas/planeta_0000_tatooine.png";



const Home = () => {
  const [showPlanet, setShowPlanet] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [dataInformation, setDataInformation] = useState();


  const [residents, setResidents] = useState<string[]>([]);
  const [films, setFilms] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [planetName, setPlanetName] = useState("");

  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<object[]>([]);
  
  const planetImages: any = {
    Naboo,
    Mustafar,
    Kashyyyk,
    Noth,
    Endor,
    Dagobah,
    Coruscant,
    Bespin,
    Alderaan,
    Tatooine
};


function getPlanetImage(planetName:any) {
  const image = planetImages[planetName];
  if (!image) {
      console.error(`imagem não entencontrada: ${planetName}`);
      return null;
  }else {
    console.log("entrou em imagem")
    return image;   
  }
 
}


  useEffect(() => {
    // Função para buscar dados da API All planets
    async function fetchData() {
      try {
        const response = await Api.get(`/planets`);
        console.log("Objet",response)
        // const result = await response;
        setAllData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    }

    // Chama a função para buscar dados
    fetchData();
  }, []); // 


  function encontrarObjetoPorInformacao(rede:any, informacao:any) {
  
    return rede.find((objeto: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.values(objeto).some(valor => valor?.toString().toLowerCase().includes(informacao.toLowerCase()));
    });

}
  
  const handleEditClick = () => {
    setEditing(true);
  
  };
  
  const handleSaveClick = () => {
    // Lógica para salvar o nome do planeta atualizado
    setEditing(false);
  };
  
  // Função para lidar com a mudança na entrada de pesquisa
  const handleInputChange = (e:any) => {
    setSearch(e.target.value);
  };

  // Função para lidar com a mudança na opção selecionada
  const handleOptionChange = (e:any) => {
    setSelectedOption(e.target.value);
  };

  const getInformation = async () => {
    const take = encontrarObjetoPorInformacao(allData, search);
    setDataInformation(take);
    setShowPlanet(true);
  
    await getResidents(take.residents);
    await getFilms(take.films);
  };

  const getResidents = async (urls:any) => {
    try {
      const promises = urls.map(async (url:any) => {
        const path = url.replace('https://swapi.dev/api/', '');
        const response = await Api.get(path);
        return response.data.name;
      });

      const names = await Promise.all(promises);
      setResidents((prevResidents) => [...prevResidents, ...names]);
    } catch (error) {
      console.error('Erro ao obter dados dos residentes:', error);
    }
  };

  const getFilms = async (urls:any) => {
    try {
      const promises = urls.map(async (url:any) => {
        const path = url.replace('https://swapi.dev/api/', '');
        const response = await Api.get(path);
        return response.data.title;
      });

      const titles = await Promise.all(promises);
      setFilms((prevFilms) => [...prevFilms, ...titles]);
    } catch (error) {
      console.error('Erro ao obter dados dos filmes:', error);
    }
  };

  // Função para renderizar a tela de erro
  const renderErrorScreen = () => {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.message}>
            <h2>Nenhum resultado encontrado</h2>
            <p>Não conseguimos encontrar nenhum resultado correspondente à sua pesquisa.</p>
          </div>
        </div>
      </div>
    );
  };

 // Função para renderizar a tela de resposta da pesquisa
const renderSearchResponse = (info:any) => {
  if (info == undefined) {
    return renderErrorScreen();
  } else {
    return (
      <div key={1} className={styles.gridcontainer}>
        <div style={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 24 }}>
          <div className={styles.verticaltopleft}>
        
            <Image width={74} src={getPlanetImage(info.name)} alt="PLANET" style={{ marginLeft: 10, marginRight: 10 }} />
            <div>
              <p>Planet:</p>
              {editing ? (
                <input
                  type="text"
                  value={planetName}
                  onChange={(e) => setPlanetName(e.target.value)}
                />
              ) : (
                planetName == "" ? <p className={styles.planetTitle}>{info.name}</p> : <p className={styles.planetTitle}>{planetName}</p> 
              )}
              {editing ? (
                <button onClick={handleSaveClick}>Salvar</button>
              ) : (
                <button onClick={()=>handleEditClick()}>Editar</button>
              )}
            </div>
          </div>
          <div className={styles.verticaltopright}>
            <div className={styles.InfosTitleRigth}>
              <span className="material-symbols-outlined">device_thermostat</span> <h4> Clima:</h4><p>{info.climate}</p> {/* Altere para o campo correto do clima */}
            </div>
            <div className={styles.InfosTitleRigth}>
              <span className="material-symbols-outlined">landscape</span> <h4>Solo: </h4><p>{info.terrain}</p> {/* Altere para o campo correto do solo */}
            </div>
            <div className={styles.InfosTitleRigth}>
              <span className="material-symbols-outlined">groups</span> <h4>População:</h4> <p>{info.population}</p> {/* Altere para o campo correto da população */}
            </div>
          </div>
        </div>

        <div style={{ alignContent: "center", justifyItems: "center" }}>
          <div className={styles.horizontalbottomleft}>
            <div className={styles.residentsinfo}>
              <div>
                <div className={styles.divTitle}>
                  <span className="material-symbols-outlined">person</span>
                  <h4>Residents: </h4>
                </div>
                <p> {residents !== undefined ? residents?.join(", "): null }</p>
             
              </div>
            </div>
          </div>

          <div className={styles.horizontalbottomright}>
            <div className={styles.divTitle}>
              <Image src={filmIcon} alt="PLANET" />
              <h4>Filmes:</h4>
            </div>
            <p> {films !== undefined ? films?.join(", "): null }</p>
          </div>
        </div>
      </div>
    );
  }
};

// Função para renderizar a tela inicial
const renderDefaultScreen = () => {
  return (
    <div className={styles.content}>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <Image width={400} src={imgFogrete} alt="Imagem 1" style={{maxWidth:"100%",display:'flex', position:"absolute",paddingRight:"200px", zIndex:1}} />
          <Image src={imgFundo} alt="Imagem 2" className={styles.rocketImage} />
        </div>
        <div className={styles.rightColumn}>
          <h2 className={styles.title}>Discover all the information about Planets of the Star Wars Saga</h2>
          <div className={styles.boxSeach}>
            <input
                type="text"
                placeholder="Enter the name in the planet"
                className={styles.searchInput}
                onChange={handleInputChange}
              />
            <button disabled={selectedOption == "" ||  search == ""} onClick={()=> { getInformation()} } className={styles.searchButton}>
            <span className="material-symbols-outlined">search</span>Search
            </button>
          </div>
          <div style={{display:"flex", paddingTop:4}}>
            <div className={styles.boxIconSearch}>
            <span className="material-symbols-outlined">tune</span>
              <p style={{marginRight:5}}>Fitler: </p>
              </div>

              <div className={styles.boxIconSearch}>
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  value="planets"
                  checked={selectedOption === 'planets'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="option1">planets</label>
              </div>

              <div className={styles.boxIconSearch}>
                <input
                  type="radio"
                  id="option2"
                  name="people"
                  value="people"
                  checked={selectedOption === 'people'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="option2">Population</label>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.homepage}>
      <div>
        <p className={styles.titleLogo}>PLANET SEARCH</p>
        <Image width={321.55} src={logoBranco} alt="Logo da Empresa" className={styles.companyLogo} style={{marginTop: "20%"}} />
      </div>

      {showPlanet ? (
        <button onClick={() => {setShowPlanet(false)
          setFilms([])
            setResidents([])}
        } className={styles.newSearch}>
          <span className="material-symbols-outlined">search</span> Nova pesquisa
        </button>
      ) : <></>}
      <div className={styles.content}>
      {showPlanet ? renderSearchResponse(dataInformation) : renderDefaultScreen()}
      </div>
      <div className={styles.footer}>
        <p>CNPJ: STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados</p>
        <Image src={logoPreto} alt="Logo da Empresa" className={styles.footerLogo} style={{paddingLeft: 20}}/>
      </div>
    </div>
  );
};

export default Home;
