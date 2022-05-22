import Head from "next/head";
import styles from "styles/Home.module.css";
import endpoints from "endpoints";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trips API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Trips API</h1>

        <p className={styles.description}>The documentation</p>

        <div className={styles.grid}>
          {endpoints.map((endpoint, index) => (
            // using () to return multiple-line jsx
            <div className={styles.card} key={index}>
              <h2>
                <code>{endpoint.name}</code>
              </h2>
              <p>{endpoint.description}</p>
              {endpoint.parameters && (
                <>
                  <br />
                  <p>Parameters:</p>
                  <ul>
                    {endpoint.parameters.map((parameter, parameterIndex) => (
                      <li key={parameterIndex}>
                        <b>{parameter.name}</b>: {parameter.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {endpoint.response && (
                <>
                  <br />
                  <p>Example response:</p>
                  <pre>
                    <code>{endpoint.response}</code>
                  </pre>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
