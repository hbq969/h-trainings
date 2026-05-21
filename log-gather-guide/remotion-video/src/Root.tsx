import { Composition } from "remotion";
import { LogGatherVideo, getDurationInFrames } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LogGather"
      component={LogGatherVideo}
      durationInFrames={getDurationInFrames()}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
