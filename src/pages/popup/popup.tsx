import { Screen, usePopupContext } from "./context";
import { BulkIndexScreen } from "./screens/bulk-index";
import { LoadingScreen } from "./screens/loading";
import { SingleIndexScreen } from "./screens/single-index";

export function Popup() {

  const screenMap : Record<Screen, React.ReactElement> = {
    [Screen.Loading]: <LoadingScreen/>,
    [Screen.BulkIndex]: <BulkIndexScreen/>,
    [Screen.SingleIndex]: <SingleIndexScreen/>,
  }

  const { screen } = usePopupContext();

  return <div className="dark w-screen h-screen">
    {screenMap[screen]}
  </div>
}