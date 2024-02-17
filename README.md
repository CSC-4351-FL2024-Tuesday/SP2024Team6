# Team6 ( Attend IN ) 

    # INSTALLATION 

        1. git clone the repositry ( Team6 )
        2. cd into the repositry ( Team 6 )
        3. create a '.env' file 
        4. copy code from discord into '.env' file
        5. run npm install ( to get system dependencies )
        6. download the **Expo Go** app in the app store 
        7. run the command app using 'npm run start'
        8. scan the qr code generated in the terminal with your
            phone to visualize the code on your phone 📲

    # Dependency 

        1. expo Go
        2. expoJs 
        3. supabase

### DataBase ### 

Sample Query to input data into classes db using supabase's sql editor

```sh
INSERT INTO
  public.classes (
    crn,
    "userId",
    "isTeacher",
    "className",
    "startClassTimes",
    "endClassTimes",
    location
  )
VALUES
  (
    43350,
    '17a8824e-cbe1-4a80-b875-11b72ad5d90d'::uuid,
    false,
    'Software Engineering',
    ARRAY[
      '2022-02-10 12:00:00'::timestamp with time zone,
      '2022-04-10 12:00:00'::timestamp with time zone
    ],
    ARRAY[
      '2022-02-10 14:00:00'::timestamp with time zone,
      '2022-04-10 14:00:00'::timestamp with time zone
    ],
    ST_Point(-73.945826, 40.80629)
  );
```
