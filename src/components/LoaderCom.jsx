import { Triangle } from "react-loader-spinner";

const LoaderCom = () => {
  return (
    <div className="absolute top-1/2 left-1/2">
      <Triangle
        type="Puff"
        color="blue"
        height={100}
        width={100}
        fontweight="bold"
      />
    </div>
  );
};

export default LoaderCom;
