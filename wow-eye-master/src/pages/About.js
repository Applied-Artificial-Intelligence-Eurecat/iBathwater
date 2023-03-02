import React from "react";
import {Header} from "../components/Header";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import "../static/styles/about.css";
import eutLogo from "../static/img/eut_logo.jpg";
import ajBcnLogo from "../static/img/ajBcn_logo.jpg";
import adasaLogo from "../static/img/adasa_logo.jpg";
import kwbLogo from "../static/img/kwb_logo.jpg";


export const About = () => {
  return (
      <>
          <Header title={'Meet the iBATHWATER Semantic Sensor Hub Team'}/>
          <Jumbotron className={'jumbotron-color-transparent'} fluid>
              <Container>
                  <img
                      src={eutLogo}
                      className="d-inline-block"
                      alt="Eurecat logo"
                  />
                  <p>
                      Eurecat is the result of a merger, starting in 2015, between Catatonia’s main technology centres. Eurecat’s technical contribution to the project counts on the Sustainability and Energy Unit, and its goal is to carry out R&D&i activities and technology development to boost competitiveness and sustainability in companies. La Unitat disposa d’equipament científic per a anàlisis químiques, proves de membrana, tractament d’aigua i residus, anàlisi microbiològica, energia, sòls i ecologia industrial. La subunitat de Water Technologies centra les seves activitats en l’estudi i el desenvolupament de proves de validació de tecnologies d’aigua de gran abast per a una gestió eficient de l’aigua, en la gestió eficient de l’aigua dins del cicle urbà i industrial, i la selecció i avaluació de tecnologies de tractament d’aigua, incloent la neteja, la regeneració i la reutilització.
                      It also counts on the Smart Management Systems Unit which develops innovative solutions (algorithms, methods, platforms) based on a combination of AI technologies and knowledge management such as: applying new technologies for developing rapid-alert systems and a support system for taking decisions for water monitoring; modelling and developing distributed water governance and management systems to the urban, industrial and rural water systems’ various players; algorithms for the predictive determination of water-consumption profiles and obtaining knowledge based on existing databases; and a simulation tool integrated into governance, management and support systems in decisions on rural, urban and industrial areas.

                      Barcelona Cicle de l’Aigua, SA (BCASA) is a municipal public company incorporated in 2014 and integrated into the Area of Ecology, Urban Planning and Mobility at Barcelona City Council. Its mission is to manage, coordinate, supervise and optimise the provision of water-cycle services in the city. BCASA’s main challenges are to transform the city’s drainage, with water regulation and real-time monitoring, by keeping floods to a minimum; define combined sewerage overflows (CSO) and reduce their impact, especially on beaches, but also along the River Besòs and in the Sports Port; increase coordination with EDARs [waste-water treatment plants] during rain events; achieve a high level of automatic local control in managing waste water; and the use of new quality water indicators to improve the management of bathing beaches.
                  </p>
              </Container>
          </Jumbotron>
          <Jumbotron className={'jumbotron-color-light jumbotron'} fluid>
              <Container>
                  <img
                      src={ajBcnLogo}
                      className="d-inline-block"
                      alt="Barcelona Council/BCASA logo"
                  />
                  <p>
                      L’ Barcelona City Council aims to make progress in an effective and integrated management of urban purification and treatment systems in the city, improving waste-water management and the quality of bathing water by minimising waste-water leakages and episodes of pollution. The Area of Ecology, Urban Planning and Mobility is the department that integrates the city’s jurisdiction over the ecology, urban planning and mobility services, and is responsible for maintaining and updating activities relating to our beaches, reducing pollution and managing waste and the water cycle.
                  </p>
              </Container>
          </Jumbotron>
          <Jumbotron className={'jumbotron-color-transparent'} fluid>
              <Container>
                  <img
                      src={adasaLogo}
                      className="d-inline-block"
                      alt="ADASA logo"
                  />
                  <p>
                      ADASA SISTEMAS is a leading company in benchmark systems engineering located in Barcelona and with an extensive presence throughout Spain and on European and international levels. It was founded in 1988 and currently belongs to the COMSA Corporación group in the area of ‘Systems and Technology’. As for basic concepts and interests relating to the proposal, ADASA’s experience is centred on the application of systems engineering and information and communication technologies for management made up of the water cycle and the environment.
                      Under the project, contributions focus on their experience in manufacturing, developing and implementing online water quality and quantity measuring devices and systems for monitoring and controlling sewers, storm tanks, waste-water treatment plants, surface water, dams, drinking-water treatment plants, sea-water desalination plants and irrigation-system distribution and supply grids. ADASA has been taking part in R&D activities since 1992, transforming results into market products and into R&D projects funded on the national level (programmes funded by the Minister for Industry, Tourism and Commerce and PROFIT programmes) and EU level (EUREKA, IBEROEKA and FP).
                  </p>
              </Container>
          </Jumbotron>

          <Jumbotron className={'jumbotron-color-light jumbotron'} fluid>
              <Container>
                  <img
                      src={kwbLogo}
                      className="d-inline-block"
                      alt="KWB logo"
                  />
                  <p>
                      Kompetenzzentrum Wasser Berlin (KWB) is a Water Research Centre with head office in Berlin. It leads the Flusshygiene project, funded by the German Ministry of Education and Research (BMBF), developing various tools for alerting and predicting the event dynamics of short-term pollution.
                      Initiatives for the iBATHWATER project are the direct result of this research project and focus on an extensive implementation, the validation of tools developed in combination with online sensor systems for greater optimisation. KWB also runs the WssTP urban waste-water working group which includes the actual state of the management of European bathing waters to provide support for revising the EU Directive on Bathing Water. KWB researchers are combining several specialist fields ranging from urban-drainage modelling, surface-water quality modelling and waste-water treatment to quantitative assessments of microbial risks.

                  </p>
              </Container>
          </Jumbotron>
      </>
  );
};