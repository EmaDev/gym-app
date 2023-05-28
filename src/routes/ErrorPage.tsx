import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error:any = useRouteError();
  console.error(error);

  return (
    <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", width: "100%"}}>
      <br/><br/>
      <h1>Oops!</h1>
      <p>Perdon, ocurrio un error inesperado.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}