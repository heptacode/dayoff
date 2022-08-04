export function waitForGeocoder(): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    if (!!naver.maps.TransCoord) {
      resolve(true);
    } else {
      const checkTransCoord = setInterval(() => {
        if (!!naver.maps.TransCoord) {
          clearInterval(checkTransCoord);
          resolve(true);
        }
      }, 50);
    }
  });
}
