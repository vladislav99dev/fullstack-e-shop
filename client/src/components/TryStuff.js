import { useParams } from "react-router-dom";

const TryStuff = () => {
    const params = useParams();
    console.log(params);
    return(
        <h1>Hello</h1>
    )
}
export default TryStuff;