import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo, Dispatch } from "react";
import { ActivityActions } from "../reducers/activity-reducer";

export type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      <ul>
        {isEmptyActivities ? (
          <p className="text-center text-2xl mt-5">No hay actividades</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="px-5 py-10 bg-white mt-5 flex justify-between items-center shadow"
            >
              <div className="space-y-2 relative">
                {" "}
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                    activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                  }`}
                >
                  {categoryName(+activity.category)}
                </p>
                <p className="text-2xl font-bold pt-5">{activity.name}</p>
                <p className="font-black text-4xl text-lime-500">
                  {" "}
                  {activity.calories} {""}
                  <span>Calorias</span>
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 
                    2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 
                    1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 
                    21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-red-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </ul>
    </>
  );
}
