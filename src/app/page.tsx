'use client' // 👈 use it here

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Importa a função Image do Next.js
import styles from './HomePage.module.css'; // Importa os estilos CSS

//Logos
import logoBranco from '../../public/img/logos/versao_1_branco.png'
import logoPreto from '../../public/img/logos/versao_2_preto.png'

//ImagensForm 
import imgFogrete from '../../public/img/fundos/spaceship5 1.png'
import imgFundo from '../../public/img/fundos/creative-mars-collage 1.png'


//Icons 
import filmIcon from '../../public/img/icons/Group_3568.svg'


// mocks 
import planetMock from '../../public/img/planetas/kashyyyk 1.png'

import Api from '../../src/app/axiosConfig'


const Home = () =>   {

  const [objeto, setObjeto] = useState({
    nome: '',
    idade: 0,
    cidade: ''
  });

  const [showPlanet, setShowpanet] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData]= useState()


  const InputSeach = (event) => {
    console.log(event, "teste event")
    setSearch(event);
  };


  const getSeach = async () =>{
    try {
      const response = await Api.get(`/planets/?search=geono`)
      setData(response.data)
      console.log("Response?",response)
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  }


  useEffect(() => {
     
  }),[];


  
  const searchResponse = () => {
    return (
  
      <div className={styles.gridcontainer}>
  
      <div style={{display:"flex",width:"100%", justifyContent:"center", marginBottom:24}}>
        <div className={styles.verticaltopleft}>  
        <Image width={74} src={planetMock} alt="PLANET" style={{marginLeft:10, marginRight:10}} />
        <div>
          <p>Planet:</p>
          <p className={styles.planetTitle}>Tatooine</p>
        </div>
        </div>
        <div className={styles.verticaltopright}>
          <div className={styles.InfosTitleRigth}>
            <span className="material-symbols-outlined">device_thermostat</span> <h4> Clima:</h4><p>Clima do Planeta</p>
          </div>
          <div className={styles.InfosTitleRigth}>
            <span className="material-symbols-outlined">landscape</span> <h4>Solo: </h4><p> Tipo de Solo</p>
          </div>
          <div className={styles.InfosTitleRigth}>
            <span className="material-symbols-outlined"> groups </span> <h4>População:</h4> <p>1000000</p>
          </div>
        </div>
      </div>
  
  
        <div style={{alignContent:"center", justifyItems:"center"}}>
          
          <div className={styles.horizontalbottomleft}>
            <div className={styles.residentsinfo}>
              <div>
                <div className={styles.divTitle}>
                <span className="material-symbols-outlined">person</span>
                <h4>Residents: </h4>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit dolore consequuntur ipsa quaerat esse inventore voluptatem iusto accusantium odio numquam voluptas hic mollitia illum ducimus molestiae, sint fugiat omnis nisi.</p>
              </div>
            </div>
          </div>
  
          <div className={styles.horizontalbottomright}>
  
            <div className={styles.divTitle}>
            <Image src={filmIcon} alt="PLANET"  />
            <h4>Filmes (5):</h4>
            </div>
  
            <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste eligendi molestias nostrum saepe non laborum ut, in rem mollitia sapiente vitae officia numquam blanditiis natus eius esse obcaecati quae velit.</p>
          </div>
        </div>
  
      </div>
    );
  };
  
  
  
  const HomeDefault = () =>{
  
    return(<>
         <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.leftColumn}>
              <Image width={400} src={imgFogrete} alt="Imagem 1" style={{maxWidth:"400px",display:'flex', position:"absolute",paddingRight:"200px", zIndex:1}} />
              <Image src={imgFundo} alt="Imagem 2"style={{maxWidth:"400px",display:"flex", borderRadius: "10px 0px 0px 20px"}} className={styles.rocketImage} />
            </div>
            <div className={styles.rightColumn}>
              
              <h2 className={styles.title} >Discover all the information about Planets of the Star Wars Saga</h2>
              
              <div className={styles.boxSeach}>
                <input
                    type="text"
                    placeholder="Enter the name in the planet"
                    className={styles.searchInput}
                    onChange={InputSeach}
                  />
                <button onClick={()=> getSeach()} className={styles.searchButton}>
                <span className="material-icons-outlined">search</span> Search
                </button>
              </div>
  
                <div style={{display:"flex", paddingTop:4}}>
                <div className={styles.boxIconSearch}>
                <span className="material-symbols-outlined">tune</span>
                  <p>Fitler </p>
                  </div>
  
                  <div className={styles.boxIconSearch}>
                  <span className="material-symbols-outlined">expand_more</span>
                  <p>Population </p>
                  </div>
  
                  <div className={styles.boxIconSearch}>
                  <span className="material-symbols-outlined">expand_more</span>
                  <p>Population</p>
                  </div>
          
              </div>
            </div>
          </div>
        </div>
    </>)
  };



  return (
    <div className={styles.homepage}>
    <div>
      <p className={styles.titleLogo}> PLANET SEARCH</p>
      <Image width={321.55} src={logoBranco} alt="Logo da Empresa" className={styles.companyLogo} style={{marginTop:"20%"}} />
    </div>

      { showPlanet ? searchResponse(): HomeDefault()}
          
      <div className={styles.footer}>
        <p>CNPJ: STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados</p>
        <Image src={logoPreto} alt="Logo da Empresa" className={styles.footerLogo} style={{paddingLeft:20}}/>
      </div>
    </div>
  );
};


export default Home;