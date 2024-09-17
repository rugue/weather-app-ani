import { useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

type Orientation = "PORTRAIT" | "LANDSCAPE";

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>("PORTRAIT");

  useEffect(() => {
    const getOrientation = async () => {
      const initialOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(
        initialOrientation === ScreenOrientation.Orientation.PORTRAIT_UP
          ? "PORTRAIT"
          : "LANDSCAPE"
      );
    };

    getOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        setOrientation(
          event.orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_UP
            ? "PORTRAIT"
            : "LANDSCAPE"
        );
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return orientation;
}
