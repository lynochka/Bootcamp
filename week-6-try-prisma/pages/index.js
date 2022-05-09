import prisma from "lib/prisma";
import styles from "styles/Home.module.css";

export default function Home({ cars, firstCar }) {
  return (
    <div className={styles.container}>
      <p>
        First car: {firstCar.brand} - {firstCar.model}
      </p>

      <ul>
        {cars.map((car, index) => {
          return (
            <li key={index}>
              {car.brand} - {car.model}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  let cars = await prisma.car.findMany();
  let firstCar = await prisma.car.findUnique({
    where: {
      id: 1,
    },
  });

  cars = JSON.parse(JSON.stringify(cars)); // to convert dates to strings
  firstCar = JSON.parse(JSON.stringify(firstCar));
  console.log(firstCar);

  return { props: { cars, firstCar } };
}
