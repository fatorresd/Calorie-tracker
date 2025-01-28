import { useMemo } from "react";
import type { Activity } from "../types/index";
import CalorieDisplay from './CalorieDisplay';

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const totalCalories = useMemo(
    () =>
      activities.reduce(
        (acc, activity) =>
          activity.category === 1 ? acc + activity.calories : acc,
        0
      ),
    [activities]
  );
  const totalBurnedCalories = useMemo(
    () =>
      activities.reduce(
        (acc, activity) =>
          activity.category === 2 ? acc + activity.calories : acc,
        0
      ),
    [activities]
  );
  const totalCaloriesDay = useMemo( () => totalCalories - totalBurnedCalories, [totalCalories, totalBurnedCalories]);

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        {" "}
        Resumen de Calorias{" "}
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay 
            calories={totalCalories}
            text="Consumidas"
        />
        <CalorieDisplay 
            calories={totalBurnedCalories}
            text="Quemadas"
        />
        <CalorieDisplay 
            calories={totalCaloriesDay}
            text="Diferencia"
        />
      </div>
    </>
  );
}
