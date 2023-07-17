import {Circles} from "react-loader-spinner";
import LoadingOverlay from "react-loading-overlay";

function Loading({active}) {
    return <LoadingOverlay active={active} spinner={<Circles color="rgb(254, 52, 110)"/>}/>
}

export default Loading