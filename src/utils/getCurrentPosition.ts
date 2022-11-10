/**
 * 현위치 가져오기
 *
 * @returns Promise<GeolocationPosition>
 */
export async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>(
    (
      resolve: (position: GeolocationPosition) => void,
      reject: (positionError: GeolocationPositionError) => void
    ) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  );
}
