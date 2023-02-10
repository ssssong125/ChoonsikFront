// import mainImg from '../../public/images/CryingChoonsik.jpg'
// import mainImg from 'CryingChoonsik.jpg'
import styles from './Main.module.css';
// import './Main.css';

function Main() {

    const imgUrl = '/images/CryingChoonsik.jpg'
    
    return (
        <>
            <div className={styles.container}>
                {/* <img src={imgUrl} alt='춘식 메인 이미지.jpg'/> */}
                <img className={styles.mainImg} src={imgUrl} alt='춘식 메인 이미지.jpg'/>
            </div>
        </>
    );
}

export default Main; 