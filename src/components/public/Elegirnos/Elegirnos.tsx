import styles from './Elegirnos.module.css';

const Elegirnos = () => {
    return (
        <section className={styles.Elegirnos}>
            <div className={styles.titles}>
                <h1 className={styles.title1}>Por que elegirnos?</h1>
                <h1 className={styles.title2}>Comprometidos con tu experiencia</h1>
            </div>
            <div className={styles.cards}>
                <div className={styles.card}>
                  <h2 className={styles.ctitle}>Vehículos 100% verificados</h2>
                  <p className={styles.ctext}>Cada vehículo de nuestro catálogo es peritado antes de ser comprado.</p>
                </div>
                <div className={styles.card}>
                  <h2 className={styles.ctitle}>Asesoría personalizada inmediata</h2>
                  <p className={styles.ctext}>Te contactamos directamente por whatsapp con un asesor experto.</p>
                </div>
                <div className={styles.card}>
                  <h2 className={styles.ctitle}>Estudio de crédito sin complicaciones</h2>
                  <p className={styles.ctext}>Solicita tu viabilidad de crédito de forma rápida y confidencial</p>
                </div>
            </div>
        </section>    
    )
}

export default Elegirnos;