import { useEffect, useRef, useState } from 'react';
import { ILocation } from '../interfaces/AuthInterface';
import GeoILocation from '@react-native-community/geoLocation';

export const useILocation = () => {
  const [hasILocation, sethasILocation] = useState(false);
  const [initialPosition, setinitialPosition] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });
  const [userILocation, setuserILocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });

  const [routeLines, setrouteLines] = useState<ILocation[]>([]);
  const watchId = useRef<number>();
  const following = useRef<boolean>(true);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrenILocation().then(ILocation => {
      console.log('getCurrenILocation', ILocation);
      if (!isMounted.current) return;
      setinitialPosition(ILocation);
      setuserILocation(ILocation);
      //setrouteLines(routes => [...routes, ILocation]);
      sethasILocation(true);
    });
  }, []);

  const getCurrenILocation = (): Promise<ILocation> => {
    return new Promise((resolve, reject) => {
      GeoILocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({ err }),
        {
          enableHighAccuracy: false,
          timeout: 2000,
        },
      );
    });
  };
  const followUserILocation = () => {
    watchId.current = GeoILocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) return;
        const ILocation: ILocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setuserILocation(ILocation);
        //setrouteLines(routes => [...routes, ILocation]);
      },
      err => console.log({ err }),
      {
        enableHighAccuracy: true,
        distanceFilter: 3,
      },
    );
  };
  const stopFollowUserILocation = () => {
    if (watchId.current) GeoILocation.clearWatch(watchId.current);
  };
  return {
    hasILocation,
    initialPosition,
    getCurrenILocation,
    userILocation,
    followUserILocation,
    setuserILocation,
    stopFollowUserILocation,
    following,
    routeLines,
  };
};
