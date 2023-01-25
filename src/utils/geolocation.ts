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
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  );
}

/**
 * 디바이스 위치 정보 구독
 */
export function watchPosition(successCallback: PositionCallback): void {
  navigator.geolocation.watchPosition(successCallback, null, {
    enableHighAccuracy: true,
    timeout: 10000,
  });
}
