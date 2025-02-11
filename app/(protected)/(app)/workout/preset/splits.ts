export interface Exercise {
    name: string;
    sets: string;
    reps: string;
}

export interface Workout {
    name: string;
    exercises: Exercise[];
}

export interface Split {
    name: string;
    slug:string;
    workouts?: Workout[];
}

export const splits: Split[] = [
    {
      name: "Upper/Lower Split",
      slug: "upper-lower",
      workouts: [
        {
          name: "Upper Body",
          exercises: [
            { name: "Bench Press", sets: "3", reps: "8-12" },
            { name: "Overhead Press", sets: "3", reps: "8-12" },
            { name: "Bent-Over Rows", sets: "3", reps: "8-12" },
            { name: "Bicep Curls", sets: "3", reps: "10-15" },
            { name: "Triceps Pushdowns", sets: "3", reps: "10-15" },
          ],
        },
        {
          name: "Lower Body",
          exercises: [
            { name: "Squats", sets: "3", reps: "8-12" },
            { name: "Deadlifts", sets: "1", reps: "5" },
            { name: "Leg Press", sets: "3", reps: "10-15" },
            { name: "Hamstring Curls", sets: "3", reps: "10-15" },
            { name: "Calf Raises", sets: "3", reps: "15-20" },
          ],
        },
      ],
    },
    {
      name: "Push/Pull/Legs Split",
      slug: "push-pull-legs",
      workouts: [
        {
          name: "Push",
          exercises: [
            { name: "Bench Press", sets: "3", reps: "8-12" },
            { name: "Overhead Press", sets: "3", reps: "8-12" },
            { name: "Incline Dumbbell Press", sets: "3", reps: "10-15" },
            { name: "Triceps Extensions", sets: "3", reps: "10-15" },
          ],
        },
        {
          name: "Pull",
          exercises: [
            { name: "Pull-ups", sets: "3", reps: "as many as possible" },
            { name: "Bent-Over Rows", sets: "3", reps: "8-12" },
            { name: "Lat Pulldowns", sets: "3", reps: "10-15" },
            { name: "Bicep Curls", sets: "3", reps: "10-15" },
          ],
        },
        {
          name: "Legs",
          exercises: [
            { name: "Squats", sets: "3", reps: "8-12" },
            { name: "Leg Press", sets: "3", reps: "10-15" },
            { name: "Hamstring Curls", sets: "3", reps: "10-15" },
            { name: "Calf Raises", sets: "3", reps: "15-20" },
          ],
        },
      ],
    },
    {
      name: "Full Body",
      slug: "full-body",
      workouts: [
        {
          name: "Full Body Workout",
          exercises: [
            { name: "Squats", sets: "3", reps: "8-12" },
            { name: "Bench Press", sets: "3", reps: "8-12" },
            { name: "Bent-Over Rows", sets: "3", reps: "8-12" },
            { name: "Overhead Press", sets: "3", reps: "8-12" },
            { name: "Push-ups", sets: "3", reps: "as many as possible" },
          ],
        },
      ],
    },
  ];