import Head from "next/head";

const Offline = () => (
  <>
    <Head>
      <title>Ciclovía App</title>
    </Head>
    <h1>Esta es una página alternativa sin conexión</h1>
    <h2>
      Cuando esté desconectado, cualquier ruta de página volverá a esta página
    </h2>
  </>
);

export default Offline;
