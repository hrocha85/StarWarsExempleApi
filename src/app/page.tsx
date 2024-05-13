'use client' 

import React, { useState } from "react";
import Image from "next/image";
import styles from './HomePage.module.css';
import logoBranco from '../../public/img/logos/versao_1_branco.png';
import logoPreto from '../../public/img/logos/versao_2_preto.png';
import imgFogrete from '../../public/img/fundos/spaceship5 1.png';
import imgFundo from '../../public/img/fundos/creative-mars-collage 1.png';
import filmIcon from '../../public/img/icons/Group_3568.svg';
import planetMock from '../../public/img/planetas/kashyyyk 1.png';
import Api from '../../src/app/axiosConfig';





const Home = () => {
  const [showPlanet, setShowPlanet] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [residents, setResidents] = useState("");
  const [films, setFilms] = useState("");

  const [editing, setEditing] = useState(false);
  const [planetName, setPlanetName] = useState("");

  const handleEditClick = (name) => {
    setEditing(true);
  
  };
  
  const handleSaveClick = () => {
    // Lógica para salvar o nome do planeta atualizado
    setEditing(false);
  };
  
  // Função para lidar com a mudança na entrada de pesquisa
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  // Função para lidar com a mudança na opção selecionada
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Função para realizar a pesquisa
  const getSearch = async () => {
    try {
      const response = await Api.get(`/${selectedOption}/?search=${search}`);
      setData(response.data.results);
      setShowPlanet(true);
      console.log(`data`,response.data.results)
      // Aguarde a conclusão das chamadas assíncronas para residentes e filmes
      await Promise.all([
        getResidents(response.data.results[0].residents[0]),
        getFilms(response.data.results[0].films[0])
      ]);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  };

  // Função para obter residentes
  const getResidents = async (url) => {
    const path = url.replace('https://swapi.dev/api/', '');
    try {
      const response = await Api.get(path);
      setResidents(response.data.name);
    } catch (error) {
      console.error('Erro ao obter dados dos residentes:', error);
    }
  };

  // Função para obter filmes
  const getFilms = async (url) => {
    const path = url.replace('https://swapi.dev/api/', '');
    try {
      const response = await Api.get(path);
      setFilms(response.data.title);
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
const renderSearchResponse = (res) => {
  if (res == "") {
    return renderErrorScreen();
  } else {
    return res.map((info, index) => (
      <div key={index} className={styles.gridcontainer}>
        <div style={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 24 }}>
          <div className={styles.verticaltopleft}>
            <Image width={74} src={planetMock} alt="PLANET" style={{ marginLeft: 10, marginRight: 10 }} />
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
                <button onClick={()=>handleEditClick(info.name)}>Editar</button>
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
                <p> {residents !== "" ? residents : null }</p>
              </div>
            </div>
          </div>

          <div className={styles.horizontalbottomright}>
            <div className={styles.divTitle}>
              <Image src={filmIcon} alt="PLANET" />
              <h4>Filmes:</h4>
            </div>
            <p> {films !== "" ? films : null }</p>
          </div>
        </div>
      </div>
    ));
  }
};

// Função para renderizar a tela inicial
const renderDefaultScreen = () => {
  return (
    <div className={styles.content}>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <Image width={400} src={imgFogrete} alt="Imagem 1" style={{maxWidth:"100%",display:'flex', position:"absolute",paddingRight:"200px", zIndex:1}} />
          <Image src={imgFundo} alt="Imagem 2"style={{maxWidth:"100%",display:"flex", borderRadius: "10px 0px 0px 20px"}} className={styles.rocketImage} />
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
            <button disabled={selectedOption == "" ||  search == ""} onClick={()=> getSearch()} className={styles.searchButton}>
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

  return (
    <div className={styles.homepage}>
      <div>
        <p className={styles.titleLogo}>PLANET SEARCH</p>
        <Image width={321.55} src={logoBranco} alt="Logo da Empresa" className={styles.companyLogo} style={{marginTop: "20%"}} />
      </div>

      {showPlanet ? (
        <button onClick={() => setShowPlanet(false)} className={styles.newSearch}>
          <span className="material-symbols-outlined">search</span> Nova pesquisa
        </button>
      ) : <></>}
      
      {showPlanet ? renderSearchResponse(data) : renderDefaultScreen()}

      <div className={styles.footer}>
        <p>CNPJ: STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados</p>
        <Image src={logoPreto} alt="Logo da Empresa" className={styles.footerLogo} style={{paddingLeft: 20}}/>
      </div>
    </div>
  );
};

export default Home;
