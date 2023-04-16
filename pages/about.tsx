import React, { useContext } from 'react'
import styles from './about.module.css'
import { LanguageContext } from '@/pages/_app'
import { aboutFR, aboutEN } from '@/translations'
import { montserrat } from '@/utlis/fonts'
import { marckScript } from '@/utlis/fonts'




const About = () => {
	const {language, setLanguage} = useContext(LanguageContext);

	const about = language==='FR'? aboutFR : aboutEN

  return (
    <div className={`${styles.aboutWrapper} ${montserrat.className}`}>
      <div className={`${styles.title} ${marckScript.className}`}>{about.demarche}</div>
      <div className={styles.paragraph}>{about.d1}</div>
      <div className={styles.paragraph}>{about.d2}</div>
      <div className={styles.paragraph}>{about.d3}</div>
      <div className={styles.paragraph}>
        <div >{about.d4l1}</div>
        <div >{about.d4l2}</div>
        <div >{about.d4l3}</div>
        <div >{about.d4l4}</div>
      </div>
      <div className={styles.paragraph}>{about.d5}</div>
      <div className={`${styles.title} ${marckScript.className}`}>{about.etudes}</div>
      <div className={styles.item}>
        <div className={styles.dates}>2016 - 2018</div><div>{about.etudes11}<br/>{about.etudes12}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2008</div><div>{about.etudes21}<br/>{about.etudes22}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2006 - 2010</div><div>{about.etudes31}<br/>{about.etudes32}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1986 - 1987</div><div>{about.etudes41}<br/>{about.etudes12}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1982 - 1885</div><div>{about.etudes51}<br/>{about.etudes52}</div>
      </div>
      <div className={`${styles.title} ${marckScript.className}`}>{about.expoIndividuelles}</div>
      <div className={styles.item}>
        <div className={styles.dates}>2021</div><div>{about.expoInd11}<br/>{about.expoInd12}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2021</div><div>{about.expoInd21}<br/>{about.expoInd22}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2018</div><div>{about.expoInd31}<br/>{about.expoInd32}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2015</div><div>{about.expoInd41}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2015</div><div>{about.expoInd51}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2013</div><div>{about.expoInd61}<br/>{about.expoInd62}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2012</div><div>{about.expoInd71}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2007</div><div>{about.expoInd81}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1999</div><div>{about.expoInd91}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1998</div><div>{about.expoInd101}<br/>{about.expoInd102}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1998</div><div>{about.expoInd111}<br/>{about.expoInd112}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1997</div><div>{about.expoInd121}<br/>{about.expoInd122}<br/>{about.expoInd123}</div>
      </div>
      <div className={`${styles.title} ${marckScript.className}`}>{about.expoCollectives}</div>
      <div className={styles.item}>
        <div className={styles.dates}>2020</div><div>{about.expoCol11}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2019</div><div>{about.expoCol21}<br/>{about.expoCol22}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2015</div><div>{about.expoCol31}<br/>{about.expoCol32}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2015</div><div>{about.expoCol41}<br/>{about.expoCol42}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2007</div><div>{about.expoCol51}<br/>{about.expoCol52}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1992</div><div>{about.expoCol61}<br/>{about.expoCol62}<br/>{about.expoCol63}</div>
      </div>
      <div className={`${styles.title} ${marckScript.className}`}>Collections:</div>
      <div>{about.collections}:</div>
      <br/>
      <div className={styles.item}>{about.coll1}</div>
      <div className={styles.item}>{about.coll2}</div>
      <div className={`${styles.title} ${marckScript.className}`}>{about.publications}</div>
      <div className={styles.item}>
        <div className={styles.dates}>2015</div><div>{about.pub1}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>2001</div><div>{about.pub2}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1998</div><div>{about.pub3}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.dates}>1992</div><div>{about.pub4}</div>
      </div>
    </div>
  )
}

export default About



