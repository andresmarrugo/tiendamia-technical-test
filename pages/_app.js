import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tiendamia Prueba Tecnica</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/new">Agregar</Link>
        </div>

        <img
          width={150}
          id="title"
          src="https://www.tiendamia.co/static/version1691185471/frontend/Tiendamia/tiger/es_CO/images/logo.svg"
          alt="tiendamia logo"
        ></img>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
