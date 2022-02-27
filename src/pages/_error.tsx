import { NextPage } from "next";

const Error: NextPage<{ statusCode?: number }> = (props) => {
  return (
    <p>
      {props.statusCode
        ? `An error ${props.statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  console.log("[ERROR]", err?.message);
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
